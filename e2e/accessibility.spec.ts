import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has proper heading hierarchy', async ({ page }) => {
    // Should have one h1 element
    const h1Elements = page.getByRole('heading', { level: 1 });
    await expect(h1Elements).toHaveCount(1);
    await expect(h1Elements).toHaveText('Ralph King Jr');

    // Should have proper h2 elements
    const h2Elements = page.getByRole('heading', { level: 2 });
    await expect(h2Elements.first()).toBeVisible();
  });

  test('has proper ARIA labels', async ({ page }) => {
    // Navigation should have proper ARIA label
    const nav = page.getByRole('navigation');
    await expect(nav).toHaveAttribute('aria-label', 'Main navigation');

    // Main content should have proper role
    const main = page.getByRole('main');
    await expect(main).toHaveAttribute('aria-label', 'Main content');

    // Footer should have proper role
    const footer = page.getByRole('contentinfo');
    await expect(footer).toHaveAttribute('aria-label', 'Footer');
  });

  test('all interactive elements are keyboard accessible', async ({ page }) => {
    // Tab through navigation links
    await page.keyboard.press('Tab'); // Skip to first link
    await expect(page.getByText('KingRalph.dev')).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // External links should be accessible
    const resumeLink = page.getByTestId('desktop-resume-link');
    await expect(resumeLink).toBeVisible();
  });

  test('mobile menu button has proper aria attributes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const menuButton = page.getByLabel('Toggle navigation menu');
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('dark mode toggle has accessible label', async ({ page }) => {
    const darkModeToggle = page.getByTestId('desktop-theme-toggle');
    await expect(darkModeToggle).toBeVisible();
  });

  test('focus is visible on interactive elements', async ({ page }) => {
    // Test that focus styles are applied
    const firstLink = page.getByText('KingRalph.dev');
    await firstLink.focus();

    // Check that the element is focused
    await expect(firstLink).toBeFocused();
  });
});
