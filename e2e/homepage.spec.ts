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

  test('renders the hero with name and role', async ({ page }) => {
    // Verify the main heading shows the name
    await expect(page.getByRole('heading', { name: 'Ralph King Jr', level: 1 })).toBeVisible();

    // Verify the role/subtitle is displayed
    await expect(page.getByRole('heading', { name: 'Software Engineer', level: 2 })).toBeVisible();

    // Verify introduction paragraph exists (not testing exact copy, just that it's present)
    const introParagraph = page.locator('p').filter({ hasText: /build software/i });
    await expect(introParagraph).toBeVisible();
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
