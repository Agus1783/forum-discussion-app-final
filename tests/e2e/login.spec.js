import { test, expect } from '@playwright/test';
import process from 'node:process';

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test.beforeEach(async ({ page }) => {
  page.on('console', (message) => {
    console.log(`[browser:${message.type()}] ${message.text()}`);
  });

  page.on('pageerror', (error) => {
    console.log(`[pageerror] ${error.message}`);
  });
});

test('should login successfully', async ({ page }) => {
  const userEmail = process.env.E2E_USER_EMAIL;
  const password = process.env.E2E_PASSWORD;

  test.skip(
    !userEmail || !password,
    'E2E_USER_EMAIL dan E2E_PASSWORD belum tersedia',
  );

  await page.goto('/login');

  await expect(
    page.locator('#email'),
  ).toBeVisible();

  await page.locator('#email').fill(userEmail);

  await page.locator('#password').fill(password);

  await page.getByRole('button', {
    name: /login/i,
  }).click();

  await expect(
    page.getByText(/invalid|gagal|error/i),
  ).not.toBeVisible({
    timeout: 3000,
  });

  await expect(page).toHaveURL(/\/$/);

  await expect(
    page.getByRole('button', {
      name: /logout/i,
    }),
  ).toBeVisible();
});
