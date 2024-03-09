import { expect, test } from '@playwright/test';

test('list all birthdays', async ({ page }) => {
	await page.goto('/birthdays');
	await expect(page.getByText('Hercules')).toBeVisible();
	await expect(page.getByText('Athena')).toBeVisible();
});
