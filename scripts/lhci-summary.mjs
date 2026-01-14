import fs from 'node:fs';
import path from 'node:path';

const manifestPath = path.resolve('.lighthouseci', 'manifest.json');
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

const writeSummary = (content) => {
  if (summaryPath) {
    fs.appendFileSync(summaryPath, content);
    return;
  }
  process.stdout.write(content);
};

if (!fs.existsSync(manifestPath)) {
  writeSummary('## Lighthouse CI\n\nNo se encontró `.lighthouseci/manifest.json`.\n');
  process.exit(0);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

if (!Array.isArray(manifest) || manifest.length === 0) {
  writeSummary('## Lighthouse CI\n\nNo hay resultados disponibles en el manifiesto.\n');
  process.exit(0);
}

const formatScore = (value) => {
  if (typeof value !== 'number') {
    return 'n/a';
  }
  const normalized = value <= 1 ? value * 100 : value;
  return `${Math.round(normalized)}`;
};

writeSummary('## Lighthouse CI\n\n');
writeSummary('| URL | Performance | Accesibilidad | SEO |\n');
writeSummary('| --- | --- | --- | --- |\n');

for (const entry of manifest) {
  const summary = entry.summary ?? {};
  const url = entry.url ?? 'Sin URL';
  const reportUrl = entry.reportUrl ?? entry.reportPath ?? entry.htmlPath ?? '';
  const urlCell = reportUrl ? `[${url}](${reportUrl})` : url;

  writeSummary(
    `| ${urlCell} | ${formatScore(summary.performance)} | ${formatScore(summary.accessibility)} | ${formatScore(summary.seo)} |\n`,
  );
}

writeSummary('\nUmbrales esperados: Performance ≥ 90, Accesibilidad ≥ 90, SEO ≥ 90.\n');
