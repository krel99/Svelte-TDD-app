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
	await page.getByRole('button', { name: 'Save' }).click();
	await expect(page.getByText('Persephone')).toBeVisible();
});

test('does not add a birthday if there are validation errors', async ({ page }) => {
	await page.goto('/birthdays');
	await page.getByLabel('Name').fill('Cyclops');
	await page.getByLabel('Date of birth').fill('INVALID');
	await page.getByRole('button', { name: 'Save' }).click();
	await expect(
		page.getByText('Please provide a date of birth in the YYYY-MM-DD format')
	).toBeVisible();
});

test('edits a birthday date', async ({ page }) => {
	await page.goto('/birthdays');
	await page.getByLabel('Name').fill('Cyclops');
	await page.getByLabel('Date of birth').fill('0000-01-01');
	await page.getByRole('button', { name: 'Save' }).click();
	await page
		.getByRole('listitem')
		.filter({ hasText: 'Cyclops' })
		.getByRole('button', { name: 'Edit' })
		.click();
	await page.getByLabel('Date of birth').fill('0001-01-01');
	await page.getByRole('button', { name: 'Save' }).click();
	await expect(page.getByRole('listitem').filter({ hasText: 'Cyclops' })).not.toContainText(
		'0000-01-01'
	);
	await expect(page.getByRole('listitem').filter({ hasText: 'Cyclops' })).toContainText(
		'0001-01-01'
	);
});
