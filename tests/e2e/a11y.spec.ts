// tests/e2e/a11y.spec.ts
// Auditoría de accesibilidad con axe-playwright.
// Falla en violaciones "critical" y "serious". Ignora "moderate" y "minor".
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

for (const { name, path } of PAGES) {
  test(`a11y: ${name} (${path}) — sin violaciones críticas ni serias`, async ({
    page,
  }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    if (blocking.length > 0) {
      const summary = blocking
        .map(
          (v) =>
            `[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}\n` +
            v.nodes
              .slice(0, 3)
              .map((n) => `  → ${n.html}`)
              .join('\n')
        )
        .join('\n\n');

      expect(
        blocking,
        `Se encontraron ${blocking.length} violación(es) bloqueantes en ${path}:\n\n${summary}`
      ).toHaveLength(0);
    }
  });
}
