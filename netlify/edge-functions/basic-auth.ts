import type { Context } from "https://edge.netlify.com";

// Edge Function que protege staging + deploy previews con Basic Auth
export default async function basicAuth(request: Request, context: Context) {
  const url = new URL(request.url);
  const hostname = url.hostname;
  const baseCsp =
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://ingester.services-prod.nsvcs.net https://ingester.services-prod.nsvcs.net/rum_collection; frame-src 'none'; manifest-src 'self'; worker-src 'self'; upgrade-insecure-requests";
  const adminCsp =
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdn.auth0.com; script-src-elem 'self' https://cdn.jsdelivr.net https://cdn.auth0.com; script-src-attr 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://*.auth0.com https://api.netlify.com https://ingester.services-prod.nsvcs.net https://ingester.services-prod.nsvcs.net/rum_collection; frame-src https://*.auth0.com; manifest-src 'self'; worker-src 'self'; upgrade-insecure-requests";
  const securityHeaders = {
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy":
      "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  };
  const isAdminRequest = url.pathname.startsWith("/admin");
  const contentSecurityPolicy = isAdminRequest ? adminCsp : baseCsp;

  // staging personalizado + branch deploy staging + deploy previews
  const isStagingDomain = hostname === "staging.adrianmariscal.es";
  const isStagingBranch = hostname.startsWith("staging--");
  const isDeployPreview = hostname.startsWith("deploy-preview-");

  // Si no es ninguno de los anteriores, no protegemos (producción u otras ramas)
  if (!isStagingDomain && !isStagingBranch && !isDeployPreview) {
    return context.next();
  }

  // Credenciales esperadas desde variables de entorno de Netlify
  const expectedUser = Netlify.env.get("STAGING_USER");
  const expectedPass = Netlify.env.get("STAGING_PASS");

  if (!expectedUser || !expectedPass) {
    console.warn(
      "[basic-auth] STAGING_USER o STAGING_PASS no están definidas; se omite Basic Auth."
    );
    return context.next();
  }

  const unauthorized = () =>
    new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Staging", charset="UTF-8"',
        "Content-Security-Policy": contentSecurityPolicy,
        ...securityHeaders,
      },
    });

  const auth = request.headers.get("authorization") || "";
  if (!auth.startsWith("Basic ")) {
    return unauthorized();
  }

  let user = "";
  let pass = "";

  try {
    const [, encoded] = auth.split(" ", 2);
    const decoded = atob(encoded);
    const [u, p] = decoded.split(":", 2);
    user = u ?? "";
    pass = p ?? "";
  } catch {
    return unauthorized();
  }

  if (user !== expectedUser || pass !== expectedPass) {
    return unauthorized();
  }

  // Credenciales correctas → continuamos con la petición normal
  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", contentSecurityPolicy);
  Object.entries(securityHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
