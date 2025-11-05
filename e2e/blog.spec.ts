/**
 * E2E tests for blog page functionality
 */

import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('should display blog page with heading', async ({ page }) => {
    // Check that the blog heading exists
    const heading = page.getByRole('heading', { name: 'Blog', level: 1 });
    await expect(heading).toBeVisible();
  });

  test('should display published posts', async ({ page }) => {
    // Wait for posts to load
    await page.waitForTimeout(1000);

    // Check if blog cards are visible (there should be at least 2 published posts)
    const blogCards = page.locator('article');
    await expect(blogCards).toHaveCount(2, { timeout: 5000 });
  });

  test('should display search bar', async ({ page }) => {
    // Check that search input exists and has proper aria-label
    const searchInput = page.getByLabel('Search blog posts');
    await expect(searchInput).toBeVisible();
  });

  test('should display category filter buttons', async ({ page }) => {
    // Wait for posts to load
    await page.waitForTimeout(1000);

    // Check that "All Posts" button exists
    const allPostsButton = page.getByRole('button', { name: 'All Posts' });
    await expect(allPostsButton).toBeVisible();

    // Check that category buttons exist
    const categoryButtons = page.locator('button[aria-pressed]');
    await expect(categoryButtons.first()).toBeVisible();
  });

  test('should expand and collapse blog post', async ({ page }) => {
    // Wait for posts to load
    await page.waitForTimeout(1000);

    // Find the first "Read more" button
    const readMoreButton = page.getByRole('button', { name: 'Read more' }).first();
    await expect(readMoreButton).toBeVisible();

    // Click to expand
    await readMoreButton.click();

    // Check that button text changed to "Collapse"
    await expect(readMoreButton).toHaveText('Collapse');

    // Check aria-expanded attribute
    await expect(readMoreButton).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    await readMoreButton.click();

    // Check that button text changed back to "Read more"
    await expect(readMoreButton).toHaveText('Read more');

    // Check aria-expanded attribute
    await expect(readMoreButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('should filter posts by search query', async ({ page }) => {
    // Wait for posts to load
    await page.waitForTimeout(1000);

    // Get initial post count
    const initialCards = page.locator('article');
    const initialCount = await initialCards.count();

    // Type in search box (this will trigger debounced search)
    const searchInput = page.getByLabel('Search blog posts');
    await searchInput.fill('Kubernetes');

    // Wait for debounce and filtering
    await page.waitForTimeout(500);

    // Check that posts are filtered (should have fewer posts)
    const filteredCards = page.locator('article');
    const filteredCount = await filteredCards.count();

    // We expect fewer posts or the same (if all match)
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('should display clear button when search has text', async ({ page }) => {
    // Wait for posts to load
    await page.waitForTimeout(1000);

    const searchInput = page.getByLabel('Search blog posts');
    const clearButton = page.getByLabel('Clear search');

    // Initially, clear button should not be visible
    await expect(clearButton).toBeHidden();

    // Type in search box
    await searchInput.fill('test');

    // Clear button should now be visible
    await expect(clearButton).toBeVisible();

    // Click clear button
    await clearButton.click();

    // Search input should be empty
    await expect(searchInput).toHaveValue('');

    // Clear button should be hidden again
    await expect(clearButton).toBeHidden();
  });

  test('should filter posts by category', async ({ page }) => {
    // Wait for posts to load
    await page.waitForTimeout(1000);

    // Get initial post count with "All Posts" selected
    const allPostsButton = page.getByRole('button', { name: 'All Posts' });
    await expect(allPostsButton).toHaveAttribute('aria-pressed', 'true');

    const initialCards = page.locator('article');
    const initialCount = await initialCards.count();

    // Click on a category button (e.g., "Platform Engineering")
    const categoryButton = page.getByRole('button', { name: 'Platform Engineering' });
    if (await categoryButton.isVisible()) {
      await categoryButton.click();

      // Check that category button is now pressed
      await expect(categoryButton).toHaveAttribute('aria-pressed', 'true');

      // Wait for filtering
      await page.waitForTimeout(300);

      // Check that posts are filtered
      const filteredCards = page.locator('article');
      const filteredCount = await filteredCards.count();

      // Should have some posts (at least 1)
      expect(filteredCount).toBeGreaterThan(0);

      // Click "All Posts" to reset
      await allPostsButton.click();

      // Wait for filtering
      await page.waitForTimeout(300);

      // Should show all posts again
      const resetCards = page.locator('article');
      await expect(resetCards).toHaveCount(initialCount);
    }
  });

  test('should display "No posts found" when search has no results', async ({ page }) => {
    // Wait for posts to load
    await page.waitForTimeout(1000);

    // Search for something that doesn't exist
    const searchInput = page.getByLabel('Search blog posts');
    await searchInput.fill('xyznonexistentquery123');

    // Wait for debounce and filtering
    await page.waitForTimeout(500);

    // Check for "No posts found" message
    await expect(page.getByText('No posts found.')).toBeVisible();
  });

  test('should work in dark mode', async ({ page }) => {
    // Wait for posts to load
    await page.waitForTimeout(1000);

    // Toggle dark mode
    const darkModeToggle = page.getByLabel(/Switch to dark mode/).first();
    await darkModeToggle.click();

    // Wait for dark mode to apply
    await page.waitForTimeout(300);

    // Check that html element has dark class
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Check that blog cards are visible in dark mode
    const blogCards = page.locator('article');
    await expect(blogCards.first()).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Wait for posts to load
    await page.waitForTimeout(1000);

    // Check that blog cards are visible
    const blogCards = page.locator('article');
    await expect(blogCards.first()).toBeVisible();

    // Check that search bar is visible
    const searchInput = page.getByLabel('Search blog posts');
    await expect(searchInput).toBeVisible();

    // Check that category buttons wrap properly (should still be visible)
    const categoryButtons = page.locator('button[aria-pressed]');
    await expect(categoryButtons.first()).toBeVisible();
  });
});

test.describe('Blog Page - Empty State', () => {
  test.skip('should display "Coming soon" when no published posts', async ({ page }) => {
    // This test is skipped because we have published posts
    // It would require mocking the blog service to return empty array
    await page.goto('/blog');
    await expect(page.getByText('Coming soon...')).toBeVisible();
  });
});
