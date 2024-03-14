import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BirthdayListPage } from '../../tests/tests-system/birthdayListPage.js';

// npx @cucumber/cucumber

Given('An existing birthday for {string} on {string}', async function (name, dateOfBirth) {
	await this.request.post('birthdays', {
		data: { name, dateOfBirth },
		failOnStatusCode: true
	});
});

When('I navigate to the {string} page', async function (url) {
	await this.page.goto(url);
});

When('I Edit the birthday for {string} to be {string}', async function (name, dateOfBirth) {
	const birthdayListPage = new BirthdayListPage(this.page);
	await birthdayListPage.beginEditingFor(name);
	await birthdayListPage.dateOfBirthField().fill(dateOfBirth);
	await birthdayListPage.saveButton().click();
});

Then('the birthday for {string} should show {string}', async function (name, dateOfBirth) {
	const birthdayListPage = new BirthdayListPage(this.page);
	await expect(birthdayListPage.entryFor(name)).toContainText(dateOfBirth);
});

Then('the text {string} should not appear on the page', async function (text) {
	await expect(this.page.getByText(text)).not.toBeVisible();
});
