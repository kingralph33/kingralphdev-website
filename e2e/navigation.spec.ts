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
    await expect(page).toHaveURL('/posts');
    await expect(page.getByRole('heading', { name: 'Posts', level: 1 })).toBeVisible();
    
    // Navigate back to Homepage
    await page.getByRole('link', { name: 'KingRalph.dev' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Ralph King Jr', level: 1 })).toBeVisible();
  });

  test('external links have target="_blank" attribute', async ({ page }) => {
    // Verify external links have correct attributes without actually clicking
    // (clicking would trigger firewall blocks in CI for external domains)
    const resumeLink = page.getByTestId('desktop-resume-link');
    await expect(resumeLink).toHaveAttribute('target', '_blank');
    await expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Verify GitHub link
    const githubLink = page.getByTestId('desktop-github-link');
    await expect(githubLink).toHaveAttribute('target', '_blank');

    // Verify LinkedIn link
    const linkedinLink = page.getByTestId('desktop-linkedin-link');
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
  });

  test('mobile navigation flow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Open mobile menu
    const menuButton = page.getByLabel('Toggle navigation menu');
    await menuButton.click();
    await expect(page.getByTestId('mobile-menu')).toBeVisible();

    // Navigate to Blog
    await page.getByTestId('mobile-blog-link').click();
    await expect(page).toHaveURL('/posts');
    
    // Menu should close after navigation
    await expect(page.getByTestId('mobile-menu')).toBeHidden();
  });
});
