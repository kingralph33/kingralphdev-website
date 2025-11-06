import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navigates to About page', async ({ page }) => {
    await page.getByTestId('desktop-about-link').click();
    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { name: 'About Me', level: 1 })).toBeVisible();
  });

  test('navigates to Blog page', async ({ page }) => {
    await page.getByTestId('desktop-blog-link').click();
    await expect(page).toHaveURL('/blog');
    await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible();
  });

  test('opens Resume in new tab', async ({ page, context }) => {
    // Verify link attributes
    const resumeLink = page.getByTestId('desktop-resume-link');
    await expect(resumeLink).toHaveAttribute('href', /kingralphresume\.com/);
    await expect(resumeLink).toHaveAttribute('target', '_blank');
    
    // Verify new page opens when clicked
    const pagePromise = context.waitForEvent('page');
    await resumeLink.click();
    const newPage = await pagePromise;
    
    // Verify a new page was opened (we don't check URL as external sites may be blocked in CI)
    expect(newPage).toBeTruthy();
    await newPage.close();
  });

  test('opens GitHub profile in new tab', async ({ page, context }) => {
    // Verify link attributes
    const githubLink = page.getByTestId('desktop-github-link');
    await expect(githubLink).toHaveAttribute('href', /github\.com\/kingralph33/);
    await expect(githubLink).toHaveAttribute('target', '_blank');
    
    // Verify new page opens when clicked
    const pagePromise = context.waitForEvent('page');
    await githubLink.click();
    const newPage = await pagePromise;
    
    // Verify a new page was opened (we don't check URL as external sites may be blocked in CI)
    expect(newPage).toBeTruthy();
    await newPage.close();
  });

  test('opens LinkedIn profile in new tab', async ({ page, context }) => {
    // Verify link attributes
    const linkedinLink = page.getByTestId('desktop-linkedin-link');
    await expect(linkedinLink).toHaveAttribute('href', /linkedin\.com/);
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    
    // Verify new page opens when clicked
    const pagePromise = context.waitForEvent('page');
    await linkedinLink.click();
    const newPage = await pagePromise;
    
    // Verify a new page was opened (we don't check URL as external sites may be blocked in CI)
    expect(newPage).toBeTruthy();
    await newPage.close();
  });

  test('mobile menu toggle works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const menuButton = page.getByLabel('Toggle navigation menu');
    const mobileMenu = page.getByTestId('mobile-menu');

    // Menu should be hidden initially
    await expect(mobileMenu).toBeHidden();

    // Click to open
    await menuButton.click();
    await expect(mobileMenu).toBeVisible();

    // Click to close
    await menuButton.click();
    await expect(mobileMenu).toBeHidden();
  });

  test('mobile menu Blog link navigates and closes menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const menuButton = page.getByLabel('Toggle navigation menu');
    const mobileMenu = page.getByTestId('mobile-menu');

    // Open mobile menu
    await menuButton.click();
    await expect(mobileMenu).toBeVisible();

    // Click Blog link
    await page.getByTestId('mobile-blog-link').click();

    // Should navigate to Blog page
    await expect(page).toHaveURL('/blog');
    await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible();

    // Mobile menu should be closed
    await expect(mobileMenu).toBeHidden();
  });

  test('affiliates dropdown works on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    const affiliatesButton = page.getByTestId('desktop-affiliates-button');
    await affiliatesButton.click();

    // Check dropdown is visible (use role="menuitem" to get desktop dropdown items)
    await expect(page.getByRole('menuitem', { name: 'Discount for systemdesignschool.io' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Discount for railway.com' })).toBeVisible();
  });

  test('closes affiliates dropdown when clicking outside', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    const affiliatesButton = page.getByTestId('desktop-affiliates-button');
    await affiliatesButton.click();

    // Verify dropdown is open (use role="menuitem" to get desktop dropdown)
    await expect(page.getByRole('menuitem', { name: 'Discount for systemdesignschool.io' })).toBeVisible();

    // Click outside the dropdown
    await page.getByRole('heading', { name: 'Ralph King Jr' }).click();

    // Dropdown should be closed
    await expect(page.getByRole('menuitem', { name: 'Discount for systemdesignschool.io' })).toBeHidden();
  });
});
