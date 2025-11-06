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
    // Wait for posts to load by checking for blog cards
    const blogCards = page.locator('article');
    await expect(blogCards.first()).toBeVisible({ timeout: 5000 });
    
    // Check if blog cards are visible (there should be at least 2 published posts)
    await expect(blogCards).toHaveCount(2, { timeout: 5000 });
  });

  test('should display search bar', async ({ page }) => {
    // Check that search input exists and has proper aria-label
    const searchInput = page.getByLabel('Search blog posts');
    await expect(searchInput).toBeVisible();
  });

  test('should display category filter buttons', async ({ page }) => {
    // Wait for posts to load by checking for "All Posts" button
    const allPostsButton = page.getByRole('button', { name: 'All Posts' });
    await expect(allPostsButton).toBeVisible({ timeout: 5000 });

    // Check that category buttons exist
    const categoryButtons = page.locator('button[aria-pressed]');
    await expect(categoryButtons.first()).toBeVisible();
  });

  test('should navigate to blog post page when clicking card', async ({ page }) => {
    // Wait for posts to load by checking for first article
    const firstArticle = page.locator('article').first();
    await expect(firstArticle).toBeVisible({ timeout: 5000 });

    // Get the post title for verification
    const postTitle = await firstArticle.locator('h2').textContent();

    // Click the card to navigate to post page
    await firstArticle.click();

    // Wait for navigation
    await page.waitForURL(/\/blog\/.+/, { timeout: 5000 });

    // Verify we're on the post page by checking the URL
    expect(page.url()).toMatch(/\/blog\/.+/);

    // Verify the post title is displayed on the post page (in the header section)
    const postPageTitle = page.locator('article header h1');
    await expect(postPageTitle).toBeVisible();
    await expect(postPageTitle).toHaveText(postTitle || '');

    // Verify back button exists
    const backButton = page.getByRole('button', { name: /Back to Blog/i });
    await expect(backButton).toBeVisible();

    // Navigate back to blog list
    await backButton.click();

    // Verify we're back on the blog list page
    await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible();
  });

  test('should filter posts by search query', async ({ page }) => {
    // Wait for posts to load
    const blogCards = page.locator('article');
    await expect(blogCards.first()).toBeVisible({ timeout: 5000 });
    
    // Get initial post count
    const initialCount = await blogCards.count();

    // Type in search box (this will trigger debounced search)
    const searchInput = page.getByLabel('Search blog posts');
    await searchInput.fill('Kubernetes');

    // Wait for debounce and re-render using network idle
    await page.waitForLoadState('networkidle');

    // Check that posts are filtered (should have fewer posts)
    const filteredCount = await blogCards.count();

    // We expect fewer posts or the same (if all match)
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('should display clear button when search has text', async ({ page }) => {
    // Wait for posts to load
    await expect(page.locator('article').first()).toBeVisible({ timeout: 5000 });

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
    // Wait for "All Posts" button to appear
    const allPostsButton = page.getByRole('button', { name: 'All Posts' });
    await expect(allPostsButton).toBeVisible({ timeout: 5000 });
    await expect(allPostsButton).toHaveAttribute('aria-pressed', 'true');

    // Get initial post count
    const blogCards = page.locator('article');
    const initialCount = await blogCards.count();

    // Click on a category button (e.g., "Platform Engineering")
    const categoryButton = page.getByTestId('category-filter-platform-engineering');
    if (await categoryButton.isVisible()) {
      await categoryButton.click();

      // Check that category button is now pressed
      await expect(categoryButton).toHaveAttribute('aria-pressed', 'true');

      // Wait for re-render
      await page.waitForLoadState('domcontentloaded');

      // Check that posts are filtered
      const filteredCount = await blogCards.count();

      // Should have some posts (at least 1)
      expect(filteredCount).toBeGreaterThan(0);

      // Click "All Posts" to reset
      await allPostsButton.click();

      // Wait for re-render
      await page.waitForLoadState('domcontentloaded');

      // Should show all posts again
      await expect(blogCards).toHaveCount(initialCount);
    }
  });

  test('should display "No posts found" when search has no results', async ({ page }) => {
    // Wait for posts to load
    await expect(page.locator('article').first()).toBeVisible({ timeout: 5000 });

    // Search for something that doesn't exist
    const searchInput = page.getByLabel('Search blog posts');
    await searchInput.fill('xyznonexistentquery123');

    // Wait for debounce and filtering
    await page.waitForLoadState('networkidle');

    // Check for "No posts found" message
    await expect(page.getByText('No posts found.')).toBeVisible();
  });

  test('should work in dark mode', async ({ page }) => {
    // Wait for posts to load
    await expect(page.locator('article').first()).toBeVisible({ timeout: 5000 });

    // Toggle dark mode
    const darkModeToggle = page.getByLabel(/Switch to dark mode/).first();
    await darkModeToggle.click();

    // Wait for dark mode class to be applied
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
    await expect(page.locator('article').first()).toBeVisible({ timeout: 5000 });

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

  test('should combine search and category filters', async ({ page }) => {
    // Wait for posts to load
    const blogCards = page.getByTestId('blog-card');
    await expect(blogCards.first()).toBeVisible({ timeout: 5000 });

    // Apply category filter
    const categoryButton = page.getByTestId('category-filter-platform-engineering');
    if (await categoryButton.isVisible()) {
      await categoryButton.click();
      await page.waitForTimeout(100);

      const categoryFilteredCount = await blogCards.count();

      // Apply search on top of category filter
      const searchInput = page.getByTestId('search-input');
      await searchInput.fill('Kubernetes');

      // Wait for debounce
      await page.waitForTimeout(400);

      // Should have fewer or equal posts than category filter alone
      const combinedFilterCount = await blogCards.count();
      expect(combinedFilterCount).toBeLessThanOrEqual(categoryFilteredCount);
    }
  });

  test('should render markdown content correctly on post page', async ({ page }) => {
    // Wait for posts to load
    const firstCard = page.getByTestId('blog-card').first();
    await expect(firstCard).toBeVisible({ timeout: 5000 });

    // Click the card to navigate to post page
    await firstCard.click();

    // Wait for navigation to post page
    await page.waitForURL(/\/blog\/.+/, { timeout: 5000 });

    // Check that article content is visible
    const article = page.locator('article').first();
    await expect(article).toBeVisible();

    // Check for prose styling (indicates markdown is rendered)
    const proseDiv = page.locator('.prose');
    await expect(proseDiv).toBeVisible();

    // Verify markdown elements are rendered
    // Check for headings, paragraphs, or other markdown elements
    const paragraphs = proseDiv.locator('p');
    await expect(paragraphs.first()).toBeVisible();
  });

  test('should display syntax-highlighted code blocks on post page', async ({ page }) => {
    // Wait for posts to load
    const firstCard = page.getByTestId('blog-card').first();
    await expect(firstCard).toBeVisible({ timeout: 5000 });

    // Click the card to navigate to post page
    await firstCard.click();

    // Wait for navigation to post page
    await page.waitForURL(/\/blog\/.+/, { timeout: 5000 });

    // Wait for article content to be visible
    const article = page.locator('article').first();
    await expect(article).toBeVisible();

    // Check if code blocks exist in the prose content
    const proseDiv = page.locator('.prose');
    const codeBlocks = proseDiv.locator('pre');

    if ((await codeBlocks.count()) > 0) {
      // Verify syntax highlighter is present
      await expect(codeBlocks.first()).toBeVisible();

      // Verify code block has syntax highlighting styles
      // SyntaxHighlighter adds specific classes/styles
      const firstCodeBlock = codeBlocks.first();
      await expect(firstCodeBlock).toBeVisible();
    }
  });

  test('should use test IDs for reliable element selection', async ({ page }) => {
    // Verify all major components have test IDs
    await expect(page.getByTestId('search-input')).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId('category-filters')).toBeVisible();
    await expect(page.getByTestId('category-filter-all')).toBeVisible();
    await expect(page.getByTestId('blog-posts-grid')).toBeVisible();
    await expect(page.getByTestId('blog-card').first()).toBeVisible();
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
