// Edge Function que protege staging + deploy previews con Basic Auth
export default async function basicAuth(request, context) {
  try {
    const url = new URL(request.url);
    const hostname = url.hostname;
    const securityHeaders = {
      "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy":
        "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
    };
    const isAdminRequest = url.pathname.startsWith("/admin");

    if (isAdminRequest) {
      return context.next();
    }

    // staging personalizado + branch deploy staging + deploy previews
    const isStagingDomain = hostname === "staging.adrianmariscal.es";
    const isStagingBranch = hostname.startsWith("staging--");
    const isDeployPreview = hostname.startsWith("deploy-preview-");

    // Si no es ninguno de los anteriores, no protegemos (producción u otras ramas)
    if (!isStagingDomain && !isStagingBranch && !isDeployPreview) {
      return context.next();
    }

    const env = typeof Netlify !== "undefined" ? Netlify.env : undefined;
    // Credenciales esperadas desde variables de entorno de Netlify
    const expectedUser = env ? env.get("STAGING_USER") : undefined;
    const expectedPass = env ? env.get("STAGING_PASS") : undefined;

    if (!expectedUser || !expectedPass) {
      console.warn(
        "[basic-auth] STAGING_USER o STAGING_PASS no están definidas; se omite Basic Auth."
      );
      return context.next();
    }

    const unauthorizedHeaders = Object.assign(
      {
        "WWW-Authenticate": 'Basic realm="Staging", charset="UTF-8"',
      },
      securityHeaders
    );
    const unauthorized = function () {
      return new Response("Unauthorized", {
        status: 401,
        headers: unauthorizedHeaders,
      });
    };

    const auth = request.headers.get("authorization") || "";
    if (!auth.startsWith("Basic ")) {
      return unauthorized();
    }

    let user = "";
    let pass = "";

    try {
      const parts = auth.split(" ", 2);
      const encoded = parts[1] || "";
      const decoded = atob(encoded);
      const credentials = decoded.split(":", 2);
      user = credentials[0] || "";
      pass = credentials[1] || "";
    } catch (error) {
      return unauthorized();
    }

    if (user !== expectedUser || pass !== expectedPass) {
      return unauthorized();
    }

    // Credenciales correctas → continuamos con la petición normal
    const response = await context.next();
    const headers = new Headers(response.headers);
    Object.keys(securityHeaders).forEach((key) => {
      headers.set(key, securityHeaders[key]);
    });

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error) {
    console.error("[basic-auth] Error inesperado en edge function.", error);
    return context.next();
  }
}
