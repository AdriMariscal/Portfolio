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

  test('snapshot visual – home desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Primera vez: genera baseline (ejecutando en local con --update-snapshots)
    // Siguientes veces: compara con el baseline para detectar regresiones.
    await expect(page).toHaveScreenshot('home-desktop.png');
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
});
