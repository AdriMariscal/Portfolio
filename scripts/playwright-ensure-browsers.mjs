import { execSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const envPath = process.env.PLAYWRIGHT_BROWSERS_PATH;
const defaultCachePath = join(homedir(), '.cache', 'ms-playwright');
const browsersPath =
  envPath === '0' ? join(process.cwd(), 'node_modules', '.playwright') : envPath || defaultCachePath;

const hasBrowserDirs = (basePath) => {
  if (!existsSync(basePath)) {
    return false;
  }

  return readdirSync(basePath, { withFileTypes: true }).some(
    (entry) =>
      entry.isDirectory() &&
      (entry.name.startsWith('chromium') ||
        entry.name.startsWith('firefox') ||
        entry.name.startsWith('webkit')),
  );
};

const ensureBrowsers = () => {
  if (hasBrowserDirs(browsersPath)) {
    return;
  }

  console.log(
    `[e2e] No Playwright browsers found in "${browsersPath}". Installing Chromium...`,
  );

  try {
    execSync('pnpm exec playwright install chromium', { stdio: 'inherit' });
  } catch (error) {
    console.warn('[e2e] Playwright install failed.');
  }

  if (!hasBrowserDirs(browsersPath)) {
    const mirrorHint = process.env.PLAYWRIGHT_DOWNLOAD_HOST
      ? `PLAYWRIGHT_DOWNLOAD_HOST=${process.env.PLAYWRIGHT_DOWNLOAD_HOST}`
      : 'PLAYWRIGHT_DOWNLOAD_HOST=<mirror-url>';
    const pathHint = `PLAYWRIGHT_BROWSERS_PATH=${browsersPath}`;

    throw new Error(
      [
        '[e2e] Playwright browsers are still missing after install.',
        `- Ensure downloads are allowed or configure a mirror: ${mirrorHint}`,
        `- Or pre-populate a cache and point to it: ${pathHint}`,
      ].join('\n'),
    );
  }
};

ensureBrowsers();
