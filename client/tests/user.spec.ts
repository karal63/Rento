import { test, expect } from '@playwright/test';

test.describe('Rental', () => {
    test('Create', async ({ page }) => {
        await page.goto('/admin/users');
        await page.getByTestId('create-user-btn').click();
        await page.getByTestId('user-name-input').fill('user');
        await page.getByTestId('user-second-name-input').fill('user');

        const email = `user-${new Date().getTime()}-@gmail.com`;
        await page.getByTestId('user-email-input').fill(email);

        await page.getByTestId('user-phone-number-input').fill('+48123123123');
        await page.getByTestId('user-password-input').fill('ZAQ!2wsx');
        await page.getByTestId('user-create-btn').click();

        await expect(page.getByText(email)).toBeVisible();
    });
});
