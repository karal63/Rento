import { test } from '@playwright/test';

test('authenticate', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@gmail.com');
    await page.getByTestId('password-input').fill("/']{:>");
    await page.getByTestId('login-button').click();
    await page.waitForURL('/');

    await page.context().storageState({ path: 'playwright/auth.json' });
});
