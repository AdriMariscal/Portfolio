(() => {
  const root = document.getElementById("auth0-root");
  const hasTokenFromHash =
    window.location.hash.includes("invite_token=") ||
    window.location.hash.includes("recovery_token=");

  if (hasTokenFromHash) {
    if (root) {
      root.innerHTML = `
        <h1 class="auth-card__title">Acceso CMS</h1>
        <p class="auth-card__subtitle">Procesando recuperación de contraseña…</p>
      `;
    }
    const cmsScript = document.createElement("script");
    cmsScript.src =
      "https://cdn.jsdelivr.net/npm/decap-cms@3/dist/decap-cms.js";
    document.body.appendChild(cmsScript);
    return;
  }

  const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } =
    window.AUTH0_CONFIG || {};
  const sdkUrls = [
    "/admin/auth0-spa-js.production.js",
    "https://cdn.auth0.com/js/auth0-spa-js/2.1/auth0-spa-js.production.js",
    "https://cdn.jsdelivr.net/npm/@auth0/auth0-spa-js@2.1.0/dist/auth0-spa-js.production.js",
    "https://unpkg.com/@auth0/auth0-spa-js@2.1.0/dist/auth0-spa-js.production.js",
  ];
  let sdkLoadPromise;
  const showSdkError = () => {
    if (!root) {
      return;
    }
    const status = document.createElement("p");
    status.className = "auth-card__status";
    status.innerHTML =
      "No se pudo cargar Auth0 (SDK no disponible). Comprueba que <a href='/admin/auth0-config.js'>auth0-config.js</a> y el script de Auth0 se hayan cargado correctamente.";
    root.appendChild(status);
    if (loginButton) {
      loginButton.disabled = true;
    }
  };
  const getCreateAuth0Client = () => {
    if (typeof createAuth0Client === "function") {
      return createAuth0Client;
    }
    if (
      window.auth0 &&
      typeof window.auth0.createAuth0Client === "function"
    ) {
      return window.auth0.createAuth0Client;
    }
    return null;
  };

  if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID) {
    if (root) {
      root.innerHTML =
        "<p>Faltan las variables de Auth0. Revisa <a href='/admin/auth0-config.js'>auth0-config.js</a>.</p>";
    }
    return;
  }

  const loginButton = document.getElementById("auth0-login");
  let auth0Client;

  const loadAuth0Sdk = async () => {
    if (getCreateAuth0Client()) {
      return;
    }
    if (sdkLoadPromise) {
      return sdkLoadPromise;
    }
    sdkLoadPromise = (async () => {
      for (const url of sdkUrls) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = url;
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        }).catch(() => undefined);
        if (getCreateAuth0Client()) {
          return;
        }
      }
      throw new Error(
        "Auth0 SDK no disponible tras cargar fuentes alternativas.",
      );
    })();
    return sdkLoadPromise;
  };

  const initAuth0 = async () => {
    try {
      await loadAuth0Sdk();
    } catch (error) {
      showSdkError();
      console.error("[auth0-login] Error cargando el SDK de Auth0", error);
      return;
    }

    const createClient = getCreateAuth0Client();
    if (!createClient) {
      showSdkError();
      return;
    }

    if (loginButton) {
      loginButton.disabled = false;
    }

    auth0Client = await createClient({
      domain: AUTH0_DOMAIN,
      clientId: AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin + "/admin/",
        audience: AUTH0_AUDIENCE || undefined,
      },
    });

    if (window.location.search.includes("code=")) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/admin/");
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    if (!isAuthenticated) {
      if (loginButton) {
        loginButton.addEventListener("click", () =>
          auth0Client.loginWithRedirect(),
        );
      }
      return;
    }

    const token = await auth0Client.getTokenSilently();
    window.CMS_AUTH_TOKEN = token;
    const cmsScript = document.createElement("script");
    cmsScript.src = "https://cdn.jsdelivr.net/npm/decap-cms@3/dist/decap-cms.js";
    document.body.appendChild(cmsScript);
    if (root) {
      root.remove();
    }
  };

  initAuth0().catch((error) => {
    console.error("[auth0-login] Error inicializando Auth0", error);
    if (root) {
      root.innerHTML =
        "<p>Ocurrió un error inicializando Auth0. Revisa la consola para más detalles.</p>";
    }
  });
})();
