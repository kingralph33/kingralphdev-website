import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the main navigation', async ({ page }) => {
    await expect(page.getByText('KingRalph.dev')).toBeVisible();
    await expect(page.getByTestId('desktop-about-link')).toBeVisible();
    await expect(page.getByTestId('desktop-resume-link')).toBeVisible();
  });

  test('renders the intro section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Ralph King Jr', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Software Engineer', level: 2 })).toBeVisible();
    await expect(page.getByText(/Building scalable solutions for government and enterprise clients/)).toBeVisible();
  });

  test('displays technology expertise section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Technology Expertise' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Backend Specialization' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cloud & DevOps' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Frontend & Full-Stack' })).toBeVisible();

    // Check for specific technologies - using .first() since technologies appear multiple times
    await expect(page.getByText('Python').first()).toBeVisible();
    await expect(page.getByText('Node.js').first()).toBeVisible();
    await expect(page.getByText('PostgreSQL').first()).toBeVisible();
    await expect(page.getByText('React').first()).toBeVisible();
  });

  test('displays recent impact projects', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recent Impact' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Government Compliance System' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Fleet Management Platform' })).toBeVisible();
    await expect(page.getByText(/Replaced legacy vendor software with custom Django application/)).toBeVisible();
    await expect(page.getByText(/Built automated workflow system managing 2,000\+ vehicles/)).toBeVisible();
  });

  test('has responsive layout', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByTestId('desktop-menu')).toBeVisible();

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByLabel('Toggle navigation menu')).toBeVisible();
  });
});
