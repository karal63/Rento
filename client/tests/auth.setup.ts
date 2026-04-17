import { test } from '@playwright/test';
import { execSync } from 'child_process';

test.beforeEach(async () => {
    // Reset database and seed admin before each test for clean state
    execSync('cd ../server && npm run db:reset && npm run db:seed', {
        stdio: 'inherit',
        env: {
            ...process.env,
            MONGODB_URI: `mongodb://127.0.0.1:27017/test_playwright_${process.env.WORKER_ID || '1'}`,
            NODE_ENV: 'test',
        },
    });
});

test('authenticate', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('email-input').fill('admin@gmail.com');
    await page.getByTestId('password-input').fill('test');
    await page.getByTestId('login-button').click();
    await page.waitForURL('/');

    await page.context().storageState({ path: 'playwright/auth.json' });
});
