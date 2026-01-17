import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "..", "public", "admin", "config.yml");

const env = process.env.ENVIRONMENT;
const siteUrl =
  process.env.CMS_SITE_URL ||
  (env === "staging"
    ? "https://staging.adrianmariscal.es"
    : "https://adrianmariscal.es");
const displayUrl = process.env.CMS_DISPLAY_URL || siteUrl;

const original = fs.readFileSync(configPath, "utf8");
const normalized = original.replace(/\ufeff/g, "");
const withoutUrls = normalized
  .replace(/^site_url:.*\r?\n/gm, "")
  .replace(/^display_url:.*\r?\n/gm, "");

const updated = `site_url: "${siteUrl}"\n` + `display_url: "${displayUrl}"\n` + withoutUrls;

if (updated !== original) {
  fs.writeFileSync(configPath, updated, "utf8");
  console.log("[cms] Updated site_url/display_url", { siteUrl, displayUrl });
} else {
  console.log("[cms] site_url/display_url already up to date", { siteUrl, displayUrl });
}
