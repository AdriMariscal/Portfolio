#!/usr/bin/env node
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const CONTENT_DIRS = [
  path.join(repoRoot, 'src', 'content', 'blog'),
  path.join(repoRoot, 'src', 'content', 'projects'),
];
const OUTPUT_DIR = path.join(repoRoot, 'public', 'images', 'uploads');
const PUBLIC_PREFIX = '/images/uploads';
const MARKDOWN_EXTENSIONS = new Set(['.md', '.mdx']);
const ALLOWED_HOSTS = new Set(['images.unsplash.com', 'images.pexels.com']);

const args = process.argv.slice(2);
const fileList = await resolveFileList(args);

if (fileList.length === 0) {
  console.log('[localize-images] No content files to process.');
  process.exit(0);
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });

const existingByHash = await buildExistingHashMap(OUTPUT_DIR);
const urlToLocal = new Map();

let downloads = 0;
let updatedFiles = 0;
let updatedUrls = 0;

for (const filePath of fileList) {
  const original = await fs.readFile(filePath, 'utf8');
  const { frontmatter, body, frontmatterBlock } = splitFrontmatter(original);
  let changed = false;
  let nextFrontmatter = frontmatter;

  if (frontmatter) {
    const result = await replaceFrontmatterImage(nextFrontmatter);
    nextFrontmatter = result.frontmatter;
    if (result.changed) {
      changed = true;
      updatedUrls += result.updatedCount;
    }
  }

  const bodyResult = await replaceBodyImages(body);
  let nextBody = bodyResult.body;
  if (bodyResult.changed) {
    changed = true;
    updatedUrls += bodyResult.updatedCount;
  }

  if (!changed) {
    continue;
  }

  updatedFiles += 1;
  let nextContent;
  if (frontmatterBlock) {
    nextContent = `---\n${nextFrontmatter}\n---\n${nextBody}`;
  } else {
    nextContent = nextBody;
  }

  if (!original.endsWith('\n') && nextContent.endsWith('\n')) {
    nextContent = nextContent.slice(0, -1);
  }

  await fs.writeFile(filePath, nextContent, 'utf8');
}

console.log(
  `[localize-images] Updated files: ${updatedFiles}. Updated URLs: ${updatedUrls}. Downloads: ${downloads}.`
);

async function resolveFileList(cliArgs) {
  const files = [];
  let fileListPath = null;

  for (let i = 0; i < cliArgs.length; i += 1) {
    const arg = cliArgs[i];
    if (arg === '--file-list') {
      fileListPath = cliArgs[i + 1];
      i += 1;
      continue;
    }
    if (arg === '--files') {
      let cursor = i + 1;
      while (cursor < cliArgs.length && !cliArgs[cursor].startsWith('--')) {
        files.push(cliArgs[cursor]);
        cursor += 1;
      }
      i = cursor - 1;
    }
  }

  if (fileListPath) {
    const content = await fs.readFile(path.resolve(repoRoot, fileListPath), 'utf8');
    const lines = content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    files.push(...lines);
  }

  if (files.length > 0) {
    return files.map((file) => path.resolve(repoRoot, file)).filter(isMarkdownFile);
  }

  const discovered = [];
  for (const dir of CONTENT_DIRS) {
    await collectMarkdownFiles(dir, discovered);
  }
  return discovered;
}

function isMarkdownFile(filePath) {
  return MARKDOWN_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

async function collectMarkdownFiles(dir, bucket) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectMarkdownFiles(fullPath, bucket);
      continue;
    }
    if (isMarkdownFile(fullPath)) {
      bucket.push(fullPath);
    }
  }
}

function splitFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) {
    return { frontmatter: null, body: content, frontmatterBlock: null };
  }
  const frontmatterBlock = match[0];
  const frontmatter = match[1];
  const body = content.slice(frontmatterBlock.length);
  return { frontmatter, body, frontmatterBlock };
}

async function replaceFrontmatterImage(frontmatterText) {
  const lines = frontmatterText.split('\n');
  let changed = false;
  let updatedCount = 0;

  const nextLines = [];
  for (const line of lines) {
    const match = line.match(/^(\s*image:)\s*(['"]?)(.*?)\2\s*$/);
    if (!match) {
      nextLines.push(line);
      continue;
    }

    const prefix = match[1];
    const originalValue = match[3];
    const localized = await localizeUrl(originalValue);
    if (localized !== originalValue) {
      changed = true;
      updatedCount += 1;
    }

    const quote = match[2] || '"';
    nextLines.push(`${prefix} ${quote}${localized}${quote}`);
  }

  return { frontmatter: nextLines.join('\n'), changed, updatedCount };
}

async function replaceBodyImages(bodyText) {
  let updatedCount = 0;
  let changed = false;

  const markdownRegex = /!\[[^\]]*]\(([^)]+)\)/g;
  let nextBody = await replaceAsync(bodyText, markdownRegex, async (match, inside) => {
    const trimmed = inside.trim();
    if (!trimmed) {
      return match;
    }

    let urlPart = trimmed;
    let suffix = '';

    if (trimmed.startsWith('<')) {
      const end = trimmed.indexOf('>');
      if (end === -1) {
        return match;
      }
      urlPart = trimmed.slice(1, end);
      suffix = trimmed.slice(end + 1);
      const localized = await localizeUrl(urlPart);
      if (localized !== urlPart) {
        updatedCount += 1;
        changed = true;
      }
      return `![${match.slice(2, match.indexOf(']'))}](<${localized}>${suffix})`;
    }

    const firstSpace = trimmed.search(/\s/);
    if (firstSpace !== -1) {
      urlPart = trimmed.slice(0, firstSpace);
      suffix = trimmed.slice(firstSpace);
    }

    const localized = await localizeUrl(urlPart);
    if (localized !== urlPart) {
      updatedCount += 1;
      changed = true;
    }
    return `![${match.slice(2, match.indexOf(']'))}](${localized}${suffix})`;
  });

  const htmlRegex = /<img\s+[^>]*src=(["'])([^"']+)\1[^>]*>/gi;
  nextBody = await replaceAsync(nextBody, htmlRegex, async (match, quote, urlValue) => {
    const localized = await localizeUrl(urlValue);
    if (localized !== urlValue) {
      updatedCount += 1;
      changed = true;
      return match.replace(urlValue, localized);
    }
    return match;
  });

  return { body: nextBody, changed, updatedCount };
}

async function localizeUrl(urlValue) {
  const trimmed = urlValue.trim();
  if (!trimmed || trimmed.startsWith('/') || trimmed.startsWith('./') || trimmed.startsWith('../')) {
    return urlValue;
  }
  if (trimmed.startsWith('data:') || trimmed.startsWith('#')) {
    return urlValue;
  }

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return urlValue;
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return urlValue;
  }
  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return urlValue;
  }

  if (urlToLocal.has(trimmed)) {
    return urlToLocal.get(trimmed);
  }

  const hash = crypto.createHash('sha1').update(trimmed).digest('hex').slice(0, 12);
  if (existingByHash.has(hash)) {
    const existingPublic = `${PUBLIC_PREFIX}/${existingByHash.get(hash)}`;
    urlToLocal.set(trimmed, existingPublic);
    return existingPublic;
  }

  let response;
  try {
    response = await fetch(trimmed);
  } catch (error) {
    console.warn(`[localize-images] Failed to fetch ${trimmed}: ${error.message}`);
    urlToLocal.set(trimmed, trimmed);
    return trimmed;
  }

  if (!response.ok) {
    console.warn(`[localize-images] Fetch failed ${trimmed}: ${response.status}`);
    urlToLocal.set(trimmed, trimmed);
    return trimmed;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get('content-type') || '';
  const ext = extensionFromContentType(contentType) || extensionFromUrl(parsed.pathname) || 'jpg';
  const slug = sanitizeBaseName(parsed.pathname) || 'image';
  const fileBase = `${slug.slice(0, 40)}-${hash}`;
  const fileName = `${fileBase}.${ext}`;

  await fs.writeFile(path.join(OUTPUT_DIR, fileName), buffer);
  downloads += 1;

  const publicPath = `${PUBLIC_PREFIX}/${fileName}`;
  existingByHash.set(hash, fileName);
  urlToLocal.set(trimmed, publicPath);
  return publicPath;
}

function sanitizeBaseName(pathname) {
  const base = decodeURIComponent(path.basename(pathname));
  const name = base.replace(/\.[a-z0-9]+$/i, '');
  const cleaned = name.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return cleaned.toLowerCase();
}

function extensionFromContentType(contentType) {
  if (contentType.includes('image/jpeg')) return 'jpg';
  if (contentType.includes('image/png')) return 'png';
  if (contentType.includes('image/webp')) return 'webp';
  if (contentType.includes('image/avif')) return 'avif';
  if (contentType.includes('image/gif')) return 'gif';
  if (contentType.includes('image/svg+xml')) return 'svg';
  return '';
}

function extensionFromUrl(pathname) {
  const ext = path.extname(pathname).toLowerCase().replace('.', '');
  if (!ext) return '';
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'svg'].includes(ext)) {
    return ext === 'jpeg' ? 'jpg' : ext;
  }
  return '';
}

async function buildExistingHashMap(dir) {
  const map = new Map();
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return map;
  }

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }
    const match = entry.name.match(/-([a-f0-9]{12})\.[a-z0-9]+$/i);
    if (match) {
      map.set(match[1].toLowerCase(), entry.name);
    }
  }
  return map;
}

async function replaceAsync(input, regex, asyncFn) {
  const matches = [];
  input.replace(regex, (match, ...args) => {
    matches.push({ match, args });
    return match;
  });

  if (matches.length === 0) {
    return input;
  }

  let result = '';
  let lastIndex = 0;
  for (const item of matches) {
    const { match, args } = item;
    const index = input.indexOf(match, lastIndex);
    if (index === -1) {
      continue;
    }
    result += input.slice(lastIndex, index);
    result += await asyncFn(match, ...args);
    lastIndex = index + match.length;
  }
  result += input.slice(lastIndex);
  return result;
}
