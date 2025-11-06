/**
 * E2E tests for blog page functionality
 * Tests critical multi-component blog interactions
 * Most blog component behavior is covered by unit tests
 *
 * Note: These tests gracefully handle both empty state (no published posts)
 * and populated state, skipping tests when no data is available.
 */

import { test, expect } from '@playwright/test';

test.describe('Blog - Critical E2E Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts');
  });

  test('complete blog journey: List → Post → Back', async ({ page }) => {
    // Start on blog list
    const heading = page.getByRole('heading', { name: 'Posts', level: 1 });
    await expect(heading).toBeVisible();

    // Check if posts exist (handle both empty and populated states)
    const blogCards = page.locator('article');

    // Wait a moment for posts to load or empty state to render
    await page.waitForTimeout(500);
    const articleCount = await blogCards.count();

    // Skip test if no published posts
    test.skip(articleCount === 0, 'Skipping: No published blog posts available');

    if (articleCount === 0) return;

    // Get first article and post title
    const firstArticle = blogCards.first();
    await expect(firstArticle).toBeVisible({ timeout: 5000 });
    const postTitle = await firstArticle.locator('h2').textContent();

    // Click to navigate to post
    await firstArticle.click();
    await page.waitForURL(/\/posts\/.+/, { timeout: 5000 });

    // Verify we're on the post page
    const postPageTitle = page.locator('article header h1');
    await expect(postPageTitle).toBeVisible();
    await expect(postPageTitle).toHaveText(postTitle || '');

    // Navigate back
    const backButton = page.getByRole('button', { name: /Back to Posts/i });
    await backButton.click();

    // Verify we're back on list page
    await expect(page.getByRole('heading', { name: 'Posts', level: 1 })).toBeVisible();
  });

  test('search and filter integration flow', async ({ page }) => {
    // Check if posts exist
    const blogCards = page.locator('article');
    await page.waitForTimeout(500);
    const articleCount = await blogCards.count();

    // Skip test if no published posts
    test.skip(articleCount === 0, 'Skipping: No published blog posts available');

    if (articleCount === 0) return;

    // Get initial count
    const initialCount = articleCount;

    // Search for Kubernetes
    const searchInput = page.getByLabel('Search blog posts');
    await searchInput.fill('Kubernetes');

    // Wait for search debounce (300ms) plus render time
    await page.waitForTimeout(400);

    // Verify filtering worked (may show 0 results if no Kubernetes posts)
    const filteredCount = await blogCards.count();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);

    // Clear search
    const clearButton = page.getByLabel('Clear search');
    await clearButton.click();

    // Wait for debounce and verify all posts are back
    await page.waitForTimeout(400);
    const clearedCount = await blogCards.count();
    expect(clearedCount).toBe(initialCount);
  });

  test('category filter flow', async ({ page }) => {
    // Check if posts exist
    const blogCards = page.locator('article');
    await page.waitForTimeout(500);
    const articleCount = await blogCards.count();

    // Skip test if no published posts (category filters won't show)
    test.skip(articleCount === 0, 'Skipping: No published blog posts available');

    if (articleCount === 0) return;

    // Wait for filters to load
    const allPostsButton = page.getByRole('button', { name: 'All Posts' });
    await expect(allPostsButton).toBeVisible({ timeout: 5000 });

    // Get initial count
    const initialCount = articleCount;

    // Click a category filter (if categories exist)
    const categoryButtons = page.locator('button[aria-pressed="false"]');
    const categoryCount = await categoryButtons.count();

    if (categoryCount > 0) {
      await categoryButtons.first().click();

      // Wait for filter to apply
      await page.waitForTimeout(200);

      // Verify filtering worked
      const filteredCount = await blogCards.count();
      expect(filteredCount).toBeLessThanOrEqual(initialCount);

      // Click "All Posts" to reset
      await allPostsButton.click();

      // Wait for reset
      await page.waitForTimeout(200);

      // Verify all posts are back
      const resetCount = await blogCards.count();
      expect(resetCount).toBe(initialCount);
    }
  });
});
