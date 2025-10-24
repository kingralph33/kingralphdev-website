import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('can toggle dark mode on desktop', async ({ page }) => {
    // Find and click the dark mode toggle
    const darkModeToggle = page.getByLabel(/Switch to dark mode/).first();
    await darkModeToggle.click();

    // Check that dark mode is applied
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Toggle back to light mode
    const lightModeToggle = page.getByLabel(/Switch to light mode/).first();
    await lightModeToggle.click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test('can toggle dark mode on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Open mobile menu
    const menuButton = page.getByLabel('Toggle navigation menu');
    await menuButton.click();

    // Find and click the dark mode toggle in mobile menu (use last() to get mobile version)
    const darkModeToggle = page.getByLabel(/Switch to dark mode/).last();
    await darkModeToggle.click();

    // Check that dark mode is applied
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('dark mode preference persists on page reload', async ({ page }) => {
    // Enable dark mode
    const darkModeToggle = page.getByLabel(/Switch to dark mode/).first();
    await darkModeToggle.click();

    // Check dark mode is enabled
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Reload the page
    await page.reload();

    // Dark mode should still be enabled
    await expect(html).toHaveClass(/dark/);
  });

  test('dark mode preference persists across navigation', async ({ page }) => {
    // Enable dark mode
    const darkModeToggle = page.getByLabel(/Switch to dark mode/).first();
    await darkModeToggle.click();

    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Navigate to About page
    await page.getByRole('link', { name: 'About' }).first().click();
    await expect(page).toHaveURL('/about');

    // Dark mode should still be enabled
    await expect(html).toHaveClass(/dark/);

    // Navigate back to home
    await page.getByText('KingRalph.dev').click();
    await expect(page).toHaveURL('/');

    // Dark mode should still be enabled
    await expect(html).toHaveClass(/dark/);
  });
});
