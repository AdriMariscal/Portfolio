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

    const header = page.locator('header');
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
    const projectHref = await projectCard
      .locator('.card__overlay-link')
      .getAttribute('href');
    expect(projectHref).toBeTruthy();

    await projectCard.click();
    await expect(page).toHaveURL(
      new RegExp(`${escapeRegex(projectHref as string)}$`)
    );

    await page.goto('/');

    const postCard = page
      .locator('.section--home-latest .card--post')
      .first();
    const postHref = await postCard
      .locator('.card__overlay-link')
      .getAttribute('href');
    expect(postHref).toBeTruthy();

    await postCard.click();
    await expect(page).toHaveURL(
      new RegExp(`${escapeRegex(postHref as string)}$`)
    );
  });

  test('toggle de tema cambia entre oscuro y claro', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.removeItem('am-theme');
    });
    await page.goto('/');

    const root = page.locator('html');
    const toggle = page.locator('[data-theme-toggle]');

    await expect(root).toHaveAttribute('data-theme', 'dark');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');

    await toggle.click();

    await expect(root).toHaveAttribute('data-theme', 'light');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');

    const storedTheme = await page.evaluate(() =>
      window.localStorage.getItem('am-theme')
    );
    expect(storedTheme).toBe('light');
  });

  test('banner de cookies permite aceptar todo y guarda preferencias', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.removeItem('am-cookie-consent-v1');
    });
    await page.goto('/');

    const banner = page.locator('[data-cookie-banner]');
    const acceptAll = page.locator('[data-cookie-accept-all]');

    await expect(banner).toBeVisible();
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

    await page.getByRole('link', { name: 'Proyectos' }).click();
    await expect(page).toHaveURL(/\/projects\/?$/);

    await page.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/\/blog\/?$/);

    await page.getByRole('link', { name: 'Contacto' }).click();
    await expect(page).toHaveURL(/\/contact\/?$/);

    await page.getByRole('link', { name: 'Inicio' }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
