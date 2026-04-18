import { test } from '@playwright/test';
import { resetDatabase } from './test-helpers';

// here we need reset to ensure we are running tests on fresh db
test.beforeEach(async () => {
    resetDatabase();
});

test('authenticate', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@gmail.com');
    await page.getByTestId('password-input').fill('test');
    await page.getByTestId('login-button').click();
    await page.waitForURL('/');

    await page.context().storageState({ path: 'playwright/auth.json' });
});
