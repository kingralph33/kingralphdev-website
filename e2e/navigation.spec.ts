import { test, expect } from '@playwright/test';

/**
 * Critical E2E Navigation Tests
 * Tests multi-page user journeys that cannot be fully validated by unit tests
 * Most navigation behavior is covered by unit tests in Navbar.test.tsx
 */
test.describe('Navigation - Critical E2E Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('complete user journey: Homepage → About → Blog → Back Home', async ({ page }) => {
    // Start at homepage
    await expect(page.getByRole('heading', { name: 'Ralph King Jr', level: 1 })).toBeVisible();
    
    // Navigate to About
    await page.getByTestId('desktop-about-link').click();
    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { name: 'About Me', level: 1 })).toBeVisible();
    
    // Navigate to Blog
    await page.getByTestId('desktop-blog-link').click();
    await expect(page).toHaveURL('/blog');
    await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible();
    
    // Navigate back to Homepage
    await page.getByRole('link', { name: 'KingRalph.dev' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Ralph King Jr', level: 1 })).toBeVisible();
  });

  test('external links open in new tabs', async ({ page, context }) => {
    // Test one external link to verify behavior (Resume)
    const resumeLink = page.getByTestId('desktop-resume-link');
    await expect(resumeLink).toHaveAttribute('target', '_blank');
    
    const pagePromise = context.waitForEvent('page');
    await resumeLink.click();
    const newPage = await pagePromise;
    
    expect(newPage).toBeTruthy();
    await newPage.close();
  });

  test('mobile navigation flow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Open mobile menu
    const menuButton = page.getByLabel('Toggle navigation menu');
    await menuButton.click();
    await expect(page.getByTestId('mobile-menu')).toBeVisible();

    // Navigate to Blog
    await page.getByTestId('mobile-blog-link').click();
    await expect(page).toHaveURL('/blog');
    
    // Menu should close after navigation
    await expect(page.getByTestId('mobile-menu')).toBeHidden();
  });
});
