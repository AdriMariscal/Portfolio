import type { Context } from "https://edge.netlify.com";

// Edge Function que protege staging + deploy previews con Basic Auth
export default async function basicAuth(request: Request, context: Context) {
  const url = new URL(request.url);
  const hostname = url.hostname;

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
  return context.next();
}
