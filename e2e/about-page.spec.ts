import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('renders the About Me heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'About Me', level: 1 })).toBeVisible();
  });

  test('displays career transition story', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'From Banking to Building Government Systems' })).toBeVisible();
    await expect(page.getByText(/My journey into tech wasn't typical/)).toBeVisible();
    await expect(page.getByText(/I started in retail banking/)).toBeVisible();
  });

  test('displays professional summary', async ({ page }) => {
    await expect(page.getByText(/Today, I'm a software engineer with 5\+ years of experience/)).toBeVisible();
    await expect(page.getByText(/I currently architect and operate OpenShift infrastructure/)).toBeVisible();
    await expect(page.getByText(/I've reduced release cycles by 70%/)).toBeVisible();
  });

  test('displays section headings', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Technical Interests' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Current Focus' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Professional Interests' })).toBeVisible();
  });

  test('displays personal life section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Beyond the Code' })).toBeVisible();
    await expect(page.getByText(/Above all, I'm a husband and a father/)).toBeVisible();
    await expect(page.getByText(/Ghost of Tsushima/)).toBeVisible();
  });

  test('displays profile image', async ({ page }) => {
    const profileImage = page.getByAltText('Ralph King Jr');
    await expect(profileImage).toBeVisible();
  });

  test('has responsive grid layout', async ({ page }) => {
    // Desktop view should show three columns
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByRole('heading', { name: 'Technical Interests' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Current Focus' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Professional Interests' })).toBeVisible();

    // Mobile view should still show all sections (stacked)
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: 'Technical Interests' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Current Focus' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Professional Interests' })).toBeVisible();
  });
});
