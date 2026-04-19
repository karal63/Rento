import { expect, test } from '@playwright/test';
import { resetDatabase } from './test-helpers';

test.describe('Car', () => {
    test.beforeEach(async () => {
        resetDatabase();
    });
    test('Create', async ({ page }) => {
        const carImg =
            'https://imgs.search.brave.com/eaCR_w_VfYVOy_w8TGEcEv10Hf6GIhQ-Do1tSH1Slls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzI3LzE3LzI3/LzM2MF9GXzQyNzE3/Mjc5Ml9BWlFSQ3BV/b3FtazgwQTdhOU1J/bFFiaVB5ZjJNd2V3/dy5qcGc';

        await page.route('**/image/upload', route =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([carImg]),
            })
        );

        await page.goto('/admin/cars/add');
        await page.getByTestId('car-brand-input').fill('BMW');
        await page.getByTestId('car-full-name-input').fill('BMW M4 Competition');

        const fileInput = page.getByTestId('car-images-input');
        await fileInput.setInputFiles({
            name: 'test-car.png',
            mimeType: 'image/png',
            buffer: Buffer.from('fake-image-content'),
        });

        await expect(page.locator(`img[src="${carImg}"]`)).toBeVisible();

        await page.getByTestId('car-acceleration-input').fill('3.9');
        await page.getByTestId('car-transmission-input').fill('Auto');
        await page.getByTestId('car-horsepower-input').fill('510');
        await page.getByTestId('car-torque-input').fill('650');
        await page.getByTestId('car-number-of-seats-input').fill('4');

        await page.getByTestId('car-deposit-input').fill('20000');
        await page.getByTestId('car-pricing-day-input').fill('1800');
        await page.getByTestId('car-pricing-days2_3-input').fill('1650');
        await page.getByTestId('car-pricing-days4_6-input').fill('1500');
        await page.getByTestId('car-pricing-days7_13-input').fill('1350');
        await page.getByTestId('car-pricing-days14_29-input').fill('1200');
        await page.getByTestId('car-pricing-month-input').fill('28000');

        await page.getByTestId('car-submit-btn').click();
        await page.goto('/admin/cars');

        const table = page.getByTestId('admin-cars-list');

        await expect(table.getByText('BMW M4 Competition')).toBeVisible();
    });

    test('Delete', async ({ page }) => {
        // Create
        const carImg =
            'https://imgs.search.brave.com/eaCR_w_VfYVOy_w8TGEcEv10Hf6GIhQ-Do1tSH1Slls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzI3LzE3LzI3/LzM2MF9GXzQyNzE3/Mjc5Ml9BWlFSQ3BV/b3FtazgwQTdhOU1J/bFFiaVB5ZjJNd2V3/dy5qcGc';

        await page.route('**/image/upload', route =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([carImg]),
            })
        );

        await page.goto('/admin/cars/add');
        await page.getByTestId('car-brand-input').fill('BMW');
        await page.getByTestId('car-full-name-input').fill('BMW M4 Competition');

        const fileInput = page.getByTestId('car-images-input');
        await fileInput.setInputFiles({
            name: 'test-car.png',
            mimeType: 'image/png',
            buffer: Buffer.from('fake-image-content'),
        });

        await expect(page.locator(`img[src="${carImg}"]`)).toBeVisible();

        await page.getByTestId('car-acceleration-input').fill('3.9');
        await page.getByTestId('car-transmission-input').fill('Auto');
        await page.getByTestId('car-horsepower-input').fill('510');
        await page.getByTestId('car-torque-input').fill('650');
        await page.getByTestId('car-number-of-seats-input').fill('4');

        await page.getByTestId('car-deposit-input').fill('20000');
        await page.getByTestId('car-pricing-day-input').fill('1800');
        await page.getByTestId('car-pricing-days2_3-input').fill('1650');
        await page.getByTestId('car-pricing-days4_6-input').fill('1500');
        await page.getByTestId('car-pricing-days7_13-input').fill('1350');
        await page.getByTestId('car-pricing-days14_29-input').fill('1200');
        await page.getByTestId('car-pricing-month-input').fill('28000');

        await page.getByTestId('car-submit-btn').click();
        await page.goto('/admin/cars');

        const table = page.getByTestId('admin-cars-list');

        await expect(table.getByText('BMW M4 Competition')).toBeVisible();

        const row = table.locator('li').filter({ hasText: 'BMW M4 Competition' });
        await row.waitFor();

        await row.locator('button').click();
        await row.getByTestId('delete-car-btn').click();
        await page.getByTestId('confirm-deletion-btn').click();

        await expect(table.getByText('BMW M4 Competition')).not.toBeVisible();
    });

    test('Edit', async ({ page }) => {
        const carImg =
            'https://imgs.search.brave.com/eaCR_w_VfYVOy_w8TGEcEv10Hf6GIhQ-Do1tSH1Slls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzI3LzE3LzI3/LzM2MF9GXzQyNzE3/Mjc5Ml9BWlFSQ3BV/b3FtazgwQTdhOU1J/bFFiaVB5ZjJNd2V3/dy5qcGc';

        await page.route('**/image/upload', route =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([carImg]),
            })
        );

        await page.goto('/admin/cars/add');
        await page.getByTestId('car-brand-input').fill('BMW');
        await page.getByTestId('car-full-name-input').fill('BMW M4 Competition');

        const fileInput = page.getByTestId('car-images-input');
        await fileInput.setInputFiles({
            name: 'test-car.png',
            mimeType: 'image/png',
            buffer: Buffer.from('fake-image-content'),
        });
        await expect(page.locator(`img[src="${carImg}"]`)).toBeVisible();

        await page.getByTestId('car-acceleration-input').fill('3.9');
        await page.getByTestId('car-transmission-input').fill('Auto');
        await page.getByTestId('car-horsepower-input').fill('510');
        await page.getByTestId('car-torque-input').fill('650');
        await page.getByTestId('car-number-of-seats-input').fill('4');

        await page.getByTestId('car-deposit-input').fill('20000');
        await page.getByTestId('car-pricing-day-input').fill('1800');
        await page.getByTestId('car-pricing-days2_3-input').fill('1650');
        await page.getByTestId('car-pricing-days4_6-input').fill('1500');
        await page.getByTestId('car-pricing-days7_13-input').fill('1350');
        await page.getByTestId('car-pricing-days14_29-input').fill('1200');
        await page.getByTestId('car-pricing-month-input').fill('28000');

        await page.getByTestId('car-submit-btn').click();
        await page.goto('/admin/cars');

        const table = page.getByTestId('admin-cars-list');
        await expect(table.getByText('BMW M4 Competition')).toBeVisible();

        const row = table.locator('li').filter({ hasText: 'BMW M4 Competition' });
        await row.waitFor();
        await row.locator('button').click();
        await row.getByTestId('edit-car-btn').click();

        await page.getByTestId('car-full-name-input').fill('edited_name');

        await page.getByTestId('car-submit-btn').click();
        await page.goto('/admin/cars');

        await expect(table.getByText('edited_name')).toBeVisible();
    });
});
