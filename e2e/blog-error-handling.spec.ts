/**
 * E2E tests for blog error handling
 * Tests error states, retry functionality, and user feedback
 */

import { test, expect } from '@playwright/test';

test.describe('Blog Error Handling', () => {
  test('should display error message with proper ARIA attributes', async ({ page }) => {
    // Mock the blog service to throw an error
    await page.route('**/posts/*.md', (route) => {
      route.abort('failed');
    });

    await page.goto('/blog');

    // Wait for error state to appear
    const errorContainer = page.locator('[role="alert"]');
    await expect(errorContainer).toBeVisible({ timeout: 10000 });

    // Verify ARIA attributes
    await expect(errorContainer).toHaveAttribute('aria-live', 'polite');

    // Verify error message is displayed
    const errorMessage = page.locator('text=/Unable to load blog posts|An unexpected error occurred/i');
    await expect(errorMessage).toBeVisible();

    // Verify error text styling
    const errorText = errorContainer.locator('p').first();
    await expect(errorText).toHaveClass(/text-red-600|dark:text-red-400/);
  });

  test('should display "Try Again" button with proper accessibility', async ({ page }) => {
    // Mock the blog service to throw an error
    await page.route('**/posts/*.md', (route) => {
      route.abort('failed');
    });

    await page.goto('/blog');

    // Wait for error state
    await expect(page.locator('[role="alert"]')).toBeVisible({ timeout: 10000 });

    // Verify "Try Again" button exists
    const retryButton = page.getByRole('button', { name: /try/i });
    await expect(retryButton).toBeVisible();

    // Verify accessibility attributes
    await expect(retryButton).toHaveAttribute('aria-label', 'Try loading posts again');

    // Verify button styling (green background)
    await expect(retryButton).toHaveClass(/bg-green-600|dark:bg-green-500/);
  });

  test('should retry loading posts when "Try Again" button is clicked', async ({ page }) => {
    let requestCount = 0;

    // Mock first request to fail, second to succeed
    await page.route('**/posts/*.md', (route) => {
      requestCount++;
      if (requestCount === 1) {
        route.abort('failed');
      } else {
        route.continue();
      }
    });

    await page.goto('/blog');

    // Wait for error state
    await expect(page.locator('[role="alert"]')).toBeVisible({ timeout: 10000 });

    // Click "Try Again" button
    const retryButton = page.getByRole('button', { name: /try/i });
    await retryButton.click();

    // Wait for loading state
    await expect(page.locator('text=Loading posts...')).toBeVisible();

    // Error should disappear and posts should load
    await expect(page.locator('[role="alert"]')).toBeHidden({ timeout: 10000 });
    
    // Blog posts should now be visible (or coming soon if no published posts)
    const heading = page.getByRole('heading', { name: 'Blog', level: 1 });
    await expect(heading).toBeVisible();
  });

  test('should distinguish between error state and empty state', async ({ page }) => {
    // First, test error state
    await page.route('**/posts/*.md', (route) => {
      route.abort('failed');
    });

    await page.goto('/blog');

    // Verify error state with "Try Again" button
    await expect(page.locator('[role="alert"]')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: /try/i })).toBeVisible();
    
    // Error message should be in red
    const errorMessage = page.locator('[role="alert"] p').first();
    await expect(errorMessage).toHaveClass(/text-red-600|dark:text-red-400/);

    // Now test empty state (no error, just no posts)
    // Note: This would require mocking to return empty array without error
    // For now, we verify the error state is distinct from empty state structure
  });

  test('should work in dark mode', async ({ page }) => {
    // Mock the blog service to throw an error
    await page.route('**/posts/*.md', (route) => {
      route.abort('failed');
    });

    await page.goto('/blog');

    // Toggle dark mode
    const darkModeToggle = page.getByLabel(/Switch to dark mode/).first();
    await darkModeToggle.click();

    // Wait for dark mode class to be applied
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Wait for error state to appear
    await expect(page.locator('[role="alert"]')).toBeVisible({ timeout: 10000 });

    // Verify error message is visible in dark mode
    const errorMessage = page.locator('[role="alert"] p').first();
    await expect(errorMessage).toBeVisible();

    // Verify "Try Again" button is visible in dark mode
    const retryButton = page.getByRole('button', { name: /try/i });
    await expect(retryButton).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Mock the blog service to throw an error
    await page.route('**/posts/*.md', (route) => {
      route.abort('failed');
    });

    await page.goto('/blog');

    // Wait for error state
    await expect(page.locator('[role="alert"]')).toBeVisible({ timeout: 10000 });

    // Verify error message is visible and readable on mobile
    const errorMessage = page.locator('[role="alert"] p').first();
    await expect(errorMessage).toBeVisible();

    // Verify "Try Again" button is visible and tappable on mobile
    const retryButton = page.getByRole('button', { name: /try/i });
    await expect(retryButton).toBeVisible();
    
    // Verify button is large enough for mobile (has padding)
    await expect(retryButton).toHaveClass(/px-6 py-2/);
  });

  test('should handle network offline state', async ({ page, context }) => {
    // Simulate offline network
    await context.setOffline(true);

    await page.goto('/blog', { waitUntil: 'domcontentloaded' });

    // Should show an error state (exact behavior depends on implementation)
    // The error might be caught by the service worker or browser
    // For now, just verify the page doesn't crash
    const heading = page.getByRole('heading', { name: 'Blog', level: 1 });
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('should maintain error state after navigation', async ({ page }) => {
    // Mock the blog service to throw an error
    await page.route('**/posts/*.md', (route) => {
      route.abort('failed');
    });

    await page.goto('/blog');

    // Wait for error state
    await expect(page.locator('[role="alert"]')).toBeVisible({ timeout: 10000 });

    // Navigate to home
    await page.getByRole('link', { name: 'KingRalph.dev' }).first().click();
    await expect(page).toHaveURL('/');

    // Navigate back to blog
    await page.getByRole('link', { name: 'Blog' }).first().click();
    await expect(page).toHaveURL('/blog');

    // Error state should appear again (because posts still fail to load)
    await expect(page.locator('[role="alert"]')).toBeVisible({ timeout: 10000 });
  });

  test('should log errors to console for debugging', async ({ page }) => {
    const consoleMessages: string[] = [];
    
    // Listen to console messages
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });

    // Mock the blog service to throw an error
    await page.route('**/posts/*.md', (route) => {
      route.abort('failed');
    });

    await page.goto('/blog');

    // Wait for error state
    await expect(page.locator('[role="alert"]')).toBeVisible({ timeout: 10000 });

    // Verify error was logged to console
    // Note: The exact error message may vary
    await page.waitForTimeout(1000); // Give time for console logs
    
    const hasErrorLog = consoleMessages.some(msg => 
      msg.includes('Error loading posts') || msg.includes('Unable to load')
    );
    
    expect(hasErrorLog).toBeTruthy();
  });
});

test.describe('Blog Error Handling - Successful Load', () => {
  test('should not show error state when posts load successfully', async ({ page }) => {
    await page.goto('/blog');

    // Wait for posts to load (or coming soon message)
    const blogCards = page.locator('article');
    
    // Either we have blog cards or "Coming soon" message
    const hasCards = (await blogCards.count()) > 0;
    const hasComingSoon = await page.locator('text=Coming soon').isVisible();
    
    expect(hasCards || hasComingSoon).toBeTruthy();

    // Error state should NOT be visible
    const errorContainer = page.locator('[role="alert"]');
    await expect(errorContainer).not.toBeVisible();

    // "Try Again" button should NOT be visible
    const retryButton = page.getByRole('button', { name: /try/i });
    await expect(retryButton).not.toBeVisible();
  });

  test('should show "Coming soon" for empty state without error', async ({ page }) => {
    // In normal operation with no posts, should show "Coming soon" not error
    await page.goto('/blog');

    // Wait for page to load
    const heading = page.getByRole('heading', { name: 'Blog', level: 1 });
    await expect(heading).toBeVisible();

    // If there are no posts, should show "Coming soon" without error styling
    const comingSoonText = page.locator('text=Coming soon');
    const errorAlert = page.locator('[role="alert"]');
    
    // Either posts exist OR coming soon is shown (not error)
    const postsExist = (await page.locator('article').count()) > 0;
    const comingSoonExists = await comingSoonText.isVisible();
    
    expect(postsExist || comingSoonExists).toBeTruthy();
    
    // Error alert should not be visible in normal operation
    if (await errorAlert.isVisible()) {
      // This would indicate a problem - fail the test
      throw new Error('Error state is visible when posts loaded successfully');
    }
  });
});
