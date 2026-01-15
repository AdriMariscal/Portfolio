// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Home – flujo básico y regresión visual', () => {
  const escapeRegex = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  test('renderiza secciones principales', async ({ page }) => {
    await page.goto('/');

    // El <title> debería contener tu nombre de marca
    await expect(page).toHaveTitle(/Adrián Mariscal/);

    // Secciones clave de la home
    await expect(
      page.getByRole('heading', { level: 2, name: 'Proyectos destacados' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { level: 2, name: 'Últimos artículos' })
    ).toBeVisible();
  });

  test('snapshot visual – header y hero estables', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Evita colisiones con headers inyectados por toolbars/overlays en dev
    const header = page.locator('header.header');
    const hero = page.locator('.hero');

    // Primera vez: genera baseline (ejecutando en local con --update-snapshots)
    // Siguientes veces: compara con el baseline para detectar regresiones.
    await expect(header).toHaveScreenshot('home-header.png');
    await expect(hero).toHaveScreenshot('home-hero.png', {
      mask: [hero.locator('.hero__stats')],
    });
  });

  test('las tarjetas de proyectos y artículos navegan al detalle', async ({
    page,
  }) => {
    await page.goto('/');

    const projectCard = page
      .locator('.section--home-projects .project-card')
      .first();

    await expect(projectCard).toBeVisible();

    const projectHref = await projectCard.getAttribute('href');
    expect(projectHref).toBeTruthy();

    await projectCard.click();
    await expect(page).toHaveURL(new RegExp(escapeRegex(projectHref!)));
  });

  test('toggle de tema cambia entre oscuro y claro', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByRole('button', { name: /tema/i });
    await expect(toggle).toBeVisible();

    const before = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );

    await toggle.click();

    const after = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );

    expect(after).toBe(!before);
  });

  test('banner de cookies permite aceptar todo y guarda preferencias', async ({
    page,
  }) => {
    await page.goto('/');

    const banner = page.locator('[data-cookie-banner]');
    await expect(banner).toBeVisible();

    const acceptAll = page.getByRole('button', { name: /aceptar todas/i });
    await expect(acceptAll).toBeVisible();

    await acceptAll.click();
    await expect(banner).toBeHidden();

    const storedPrefs = await page.evaluate(() =>
      window.localStorage.getItem('am-cookie-consent-v1')
    );
    expect(storedPrefs).toBeTruthy();
  });

  test('navegación principal lleva a las secciones clave', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Acotamos al <nav aria-label="Navegación principal"> para evitar colisiones con otros links
    const nav = page.getByRole('navigation', { name: 'Navegación principal' });

    await nav.getByRole('link', { name: 'Ir a proyectos', exact: true }).click();
    await expect(page).toHaveURL(/\/projects\/?$/);

    await nav.getByRole('link', { name: 'Ir al blog', exact: true }).click();
    await expect(page).toHaveURL(/\/blog\/?$/);

    await nav.getByRole('link', { name: 'Ir a contacto', exact: true }).click();
    await expect(page).toHaveURL(/\/contact\/?$/);

    await nav.getByRole('link', { name: 'Ir a inicio', exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
