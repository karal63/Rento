import { test, expect } from '@playwright/test';
import { resetDatabase } from './test-helpers';

test.describe('User', () => {
    test.beforeEach(async () => {
        resetDatabase();
    });
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

        const table = page.getByTestId('users-table');

        await expect(table.getByText(email)).toBeVisible();
    });

    test('Edit', async ({ page }) => {
        await page.goto('/admin/users');
        await page.getByTestId('create-user-btn').click();
        await page.getByTestId('user-name-input').fill('user');
        await page.getByTestId('user-second-name-input').fill('user');

        const email = `user-${new Date().getTime()}-@gmail.com`;
        await page.getByTestId('user-email-input').fill(email);

        await page.getByTestId('user-phone-number-input').fill('+48123123123');
        await page.getByTestId('user-password-input').fill('ZAQ!2wsx');
        await page.getByTestId('user-create-btn').click();

        const table = page.getByTestId('users-table');
        await expect(table.getByText(email)).toBeVisible();

        // Find and click edit on the created record
        const record = table.locator('tr').filter({ hasText: email });
        await record.waitFor();

        await record.locator('button').click();
        await record.getByTestId('edit-user-btn').click();

        await page.getByTestId('user-name-input').fill('updated-user');
        await page.getByTestId('submit-edit-user-btn').click();

        await expect(table.getByText('updated-user')).toBeVisible();
    });

    test('Delete', async ({ page }) => {
        await page.goto('/admin/users');
        await page.getByTestId('create-user-btn').click();
        await page.getByTestId('user-name-input').fill('user');
        await page.getByTestId('user-second-name-input').fill('user');

        const email = `user-${new Date().getTime()}-@gmail.com`;
        await page.getByTestId('user-email-input').fill(email);

        await page.getByTestId('user-phone-number-input').fill('+48123123123');
        await page.getByTestId('user-password-input').fill('ZAQ!2wsx');
        await page.getByTestId('user-create-btn').click();

        const table = page.getByTestId('users-table');
        await expect(table.getByText(email)).toBeVisible();

        // Find and click edit on the created record
        const record = table.locator('tr').filter({ hasText: email });
        await record.waitFor();

        await record.locator('button').click();
        await record.getByTestId('delete-user-btn').click();

        await page.getByTestId('confirm-deletion-btn').click();

        await expect(table.getByText(email)).not.toBeVisible();
    });
});
