import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  const baseUrl = 'https://practicetestautomation.com/practice-test-login/';
  const evidenciasPath = './test-results/evidencias';

  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto(baseUrl);
      await expect(page.getByRole('heading', { name: 'Test login' })).toBeVisible();
    });
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await test.step('Fill username', async () => {
      await page.getByLabel('Username').fill('student');
    });

    await test.step('Fill password', async () => {
      await page.getByLabel('Password').fill('Password123');
    });

    await test.step('Submit form', async () => {
      await page.getByRole('button', { name: 'Submit' }).click();
    });

    await test.step('Verify success message', async () => {
      await expect(page).toHaveURL(/.*logged-in-successfully/);
      await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    });

    await test.step('Take success screenshot', async () => {
      await page.screenshot({
        path: `${evidenciasPath}/login-success.png`,
        fullPage: true
      });
    });
  });

  test('should show error with invalid username', async ({ page }) => {
    await test.step('Fill invalid username', async () => {
      await page.getByLabel('Username').fill('wronguser');
    });

    await test.step('Fill valid password', async () => {
      await page.getByLabel('Password').fill('Password123');
    });

    await test.step('Submit form', async () => {
      await page.getByRole('button', { name: 'Submit' }).click();
    });

    await test.step('Verify error message', async () => {
        await expect(page.locator('#error')).toHaveText('Your username is invalid!');
    });

    await test.step('Take error screenshot', async () => {
      await page.screenshot({
        path: `${evidenciasPath}/login-user-invalid.png`,
        fullPage: true
      });
    });
  });

  test('should show error with invalid password', async ({ page }) => {
    await test.step('Fill valid username', async () => {
      await page.getByLabel('Username').fill('student');
    });

    await test.step('Fill invalid password', async () => {
      await page.getByLabel('Password').fill('wrongpass');
    });

    await test.step('Submit form', async () => {
      await page.getByRole('button', { name: 'Submit' }).click();
    });

    await test.step('Verify error message', async () => {
        await expect(page.locator('#error')).toHaveText('Your password is invalid!');
    });

    await test.step('Take error screenshot', async () => {
      await page.screenshot({
        path: `${evidenciasPath}/login-pass-invalid.png`,
        fullPage: true
      });
    });
  });
});