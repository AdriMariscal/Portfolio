(() => {
  const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } =
    window.AUTH0_CONFIG || {};
  const root = document.getElementById("auth0-root");

  if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID) {
    if (root) {
      root.innerHTML =
        "<p>Faltan las variables de Auth0. Revisa <a href='/admin/auth0-config.js'>auth0-config.js</a>.</p>";
    }
    return;
  }

  const loginButton = document.getElementById("auth0-login");
  let auth0Client;

  const initAuth0 = async () => {
    auth0Client = await createAuth0Client({
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

  initAuth0();
})();
