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
    await expect(page.getByText(/Building cloud-native infrastructure and developer tooling for mission-critical government systems/)).toBeVisible();
  });

  test('displays technology expertise section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Technology Expertise' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Platform & Infrastructure' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cloud & DevOps' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Development & Tooling' })).toBeVisible();

    // Check for specific technologies - using .first() since technologies appear multiple times
    await expect(page.getByText('Kubernetes/OpenShift').first()).toBeVisible();
    await expect(page.getByText('CI/CD Automation').first()).toBeVisible();
    await expect(page.getByText('Infrastructure as Code').first()).toBeVisible();
    await expect(page.getByText('Python').first()).toBeVisible();
    await expect(page.getByText('TypeScript').first()).toBeVisible();
  });

  test('displays recent impact projects', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recent Impact' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'OpenShift Platform Infrastructure' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Enterprise DevOps Migration' })).toBeVisible();
    await expect(page.getByText(/Architected and operate container platform serving 7,500\+ users/)).toBeVisible();
    await expect(page.getByText(/Led platform migration from TFS to Azure DevOps/)).toBeVisible();
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
