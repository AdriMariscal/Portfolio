import { writeFile } from "node:fs/promises";

const issuerBaseUrl =
  process.env.AUTH0_ISSUER_BASE_URL ??
  process.env.PUBLIC_AUTH0_ISSUER_BASE_URL ??
  "";
const normalizeDomain = (value) =>
  (value ?? "").replace(/^https?:\/\//, "").replace(/\/$/, "");
const domain = normalizeDomain(
  process.env.AUTH0_DOMAIN ?? process.env.PUBLIC_AUTH0_DOMAIN ?? issuerBaseUrl,
);
const clientId =
  process.env.AUTH0_CLIENT_ID ??
  process.env.PUBLIC_AUTH0_CLIENT_ID ??
  "";
const audience =
  process.env.AUTH0_AUDIENCE ??
  process.env.PUBLIC_AUTH0_AUDIENCE ??
  "";

const contents = `window.AUTH0_CONFIG = {
  AUTH0_DOMAIN: ${JSON.stringify(domain)},
  AUTH0_CLIENT_ID: ${JSON.stringify(clientId)},
  AUTH0_AUDIENCE: ${JSON.stringify(audience)},
  AUTH0_ISSUER_BASE_URL: ${JSON.stringify(issuerBaseUrl)},
};
`;

await writeFile("public/admin/auth0-config.js", contents, "utf8");

if (!domain || !clientId) {
  console.warn(
    "[auth0-config] AUTH0_DOMAIN/AUTH0_ISSUER_BASE_URL o AUTH0_CLIENT_ID están vacíos. El CMS pedirá configuración manual.",
  );
}
