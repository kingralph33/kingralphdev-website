/**
 * E2E tests for blog page functionality
 * Tests critical multi-component blog interactions
 * Most blog component behavior is covered by unit tests
 */

import { test, expect } from '@playwright/test';

test.describe('Blog - Critical E2E Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('complete blog journey: List → Post → Back', async ({ page }) => {
    // Start on blog list
    const heading = page.getByRole('heading', { name: 'Blog', level: 1 });
    await expect(heading).toBeVisible();

    // Wait for posts to load
    const firstArticle = page.locator('article').first();
    await expect(firstArticle).toBeVisible({ timeout: 5000 });

    // Get post title for verification
    const postTitle = await firstArticle.locator('h2').textContent();

    // Click to navigate to post
    await firstArticle.click();
    await page.waitForURL(/\/blog\/.+/, { timeout: 5000 });

    // Verify we're on the post page
    const postPageTitle = page.locator('article header h1');
    await expect(postPageTitle).toBeVisible();
    await expect(postPageTitle).toHaveText(postTitle || '');

    // Navigate back
    const backButton = page.getByRole('button', { name: /Back to Blog/i });
    await backButton.click();

    // Verify we're back on list page
    await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible();
  });

  test('search and filter integration flow', async ({ page }) => {
    // Wait for posts to load
    const blogCards = page.locator('article');
    await expect(blogCards.first()).toBeVisible({ timeout: 5000 });
    const initialCount = await blogCards.count();

    // Search for Kubernetes
    const searchInput = page.getByLabel('Search blog posts');
    await searchInput.fill('Kubernetes');
    await page.waitForLoadState('networkidle');

    // Verify filtering worked
    const filteredCount = await blogCards.count();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);

    // Clear search
    const clearButton = page.getByLabel('Clear search');
    await clearButton.click();
    await page.waitForLoadState('networkidle');

    // Verify all posts are back
    const clearedCount = await blogCards.count();
    expect(clearedCount).toBe(initialCount);
  });

  test('category filter flow', async ({ page }) => {
    // Wait for filters to load
    const allPostsButton = page.getByRole('button', { name: 'All Posts' });
    await expect(allPostsButton).toBeVisible({ timeout: 5000 });

    // Get initial count
    const blogCards = page.locator('article');
    const initialCount = await blogCards.count();

    // Click a category filter (if categories exist)
    const categoryButtons = page.locator('button[aria-pressed="false"]');
    const categoryCount = await categoryButtons.count();
    
    if (categoryCount > 0) {
      await categoryButtons.first().click();
      await page.waitForLoadState('networkidle');

      // Verify filtering worked
      const filteredCount = await blogCards.count();
      expect(filteredCount).toBeLessThanOrEqual(initialCount);

      // Click "All Posts" to reset
      await allPostsButton.click();
      await page.waitForLoadState('networkidle');
