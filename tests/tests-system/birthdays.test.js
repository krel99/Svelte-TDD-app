import { expect, test } from '@playwright/test';

test('list all birthdays', async ({ page }) => {
	await page.goto('/birthdays');
	await expect(page.getByText('Hercules')).toBeVisible();
	await expect(page.getByText('Athena')).toBeVisible();
});

test('saves a new birthday', async ({ page }) => {
	await page.goto('/birthdays');
	await page.getByLabel('Name').fill('Persephone');
	await page.getByLabel('Date of birth').fill('1985-01-01');
	await page.getByRole('button').click();
	await expect(page.getByText('Persephone')).toBeVisible();
});

test('does not have a birthday if there are validation errors', async ({ page }) => {
	await page.goto('/birthdays');
	await page.getByLabel('Name').fill('Cyclops');
	await page.getByLabel('Date of birth').fill('INVALID');
	await page.getByRole('button').click();
	await expect(
		page.getByText('Please provide a date of birth in the YYYY-MM-DD format.')
	).toBeVisible();
});
