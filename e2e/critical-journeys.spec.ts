import { test, expect } from '@playwright/test';

/**
 * Critical E2E Smoke Tests
 * 
 * This file contains only the most critical end-to-end user journeys that
 * cannot be adequately tested with unit/integration tests:
 * 1. Homepage renders correctly (smoke test)
 * 2. Navigation between pages works
 * 3. Dark mode persists across pages and reloads (real localStorage)
 * 4. External links open in new tabs
 */

test.describe('Critical User Journeys', () => {
  test('homepage smoke test - renders all key sections', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation
    await expect(page.getByText('KingRalph.dev')).toBeVisible();
    await expect(page.getByTestId('desktop-about-link')).toBeVisible();
    
    // Check main content sections
    await expect(page.getByRole('heading', { name: 'Ralph King Jr', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Software Engineer', level: 2 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Technology Expertise' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Recent Impact' })).toBeVisible();
    
    // Check footer
    await expect(page.getByText(/Ralph King. All rights reserved./i)).toBeVisible();
  });

  test('navigation flow: home → about → home', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to About
    await page.getByTestId('desktop-about-link').click();
    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { name: 'About Me', level: 1 })).toBeVisible();
    
    // Navigate back to home
    await page.getByText('KingRalph.dev').click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Ralph King Jr', level: 1 })).toBeVisible();
  });

  test('dark mode persists across navigation and page reload', async ({ page }) => {
    await page.goto('/');
    
    // Enable dark mode
    await page.getByTestId('desktop-theme-toggle').click();
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
    
    // Navigate to another page - dark mode should persist
    await page.getByTestId('desktop-about-link').click();
    await expect(html).toHaveClass(/dark/);
    
    // Reload page - dark mode should still persist
    await page.reload();
    await expect(html).toHaveClass(/dark/);
  });

  test('external links open in new tabs', async ({ page, context }) => {
    await page.goto('/');
    
    // Test Resume link
    const resumePagePromise = context.waitForEvent('page');
    await page.getByTestId('desktop-resume-link').click();
    const resumePage = await resumePagePromise;
    await expect(resumePage).toHaveURL(/kingralphresume\.com/);
    await resumePage.close();
    
    // Test GitHub link
    const githubPagePromise = context.waitForEvent('page');
    await page.getByTestId('desktop-github-link').click();
    const githubPage = await githubPagePromise;
    await expect(githubPage).toHaveURL(/github\.com\/kingralph33/);
    await githubPage.close();
    
    // Test LinkedIn link
    const linkedinPagePromise = context.waitForEvent('page');
    await page.getByTestId('desktop-linkedin-link').click();
    const linkedinPage = await linkedinPagePromise;
    await expect(linkedinPage).toHaveURL(/linkedin\.com/);
  });

  test('mobile responsiveness - menu and navigation work', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Mobile menu should be hidden initially
    await expect(page.getByTestId('mobile-menu')).toBeHidden();
    
    // Open mobile menu
    const menuButton = page.getByLabel('Toggle navigation menu');
    await menuButton.click();
    await expect(page.getByTestId('mobile-menu')).toBeVisible();
    
    // Navigate to About via mobile menu
    await page.getByTestId('mobile-about-link').click();
    await expect(page).toHaveURL('/about');
    
    // Mobile menu should be closed after navigation
    await expect(page.getByTestId('mobile-menu')).toBeHidden();
  });
});
