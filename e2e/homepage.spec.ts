import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the main navigation', async ({ page }) => {
    await expect(page.getByText('KingRalph.dev')).toBeVisible();
    await expect(page.getByTestId('desktop-about-link')).toBeVisible();
    await expect(page.getByTestId('desktop-resume-link')).toBeVisible();
  });

  test('renders the hero', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Ralph King Jr', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Software Engineer', level: 2 })).toBeVisible();
    await expect(page.getByText(/Building cloud-native infrastructure and developer tooling for mission-critical government systems\./)).toBeVisible();
  });

  test('shows primary CTAs', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Go to About page' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Hero resume link, opens in new tab' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Go to Posts page' })).toBeVisible();
  });

  test('has responsive layout', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByTestId('desktop-menu')).toBeVisible();

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByLabel('Toggle navigation menu')).toBeVisible();
  });
});
