export class BirthdayListPage {
	constructor(page) {
		this.page = page;
	}

	async goto() {
		await this.page.goto('/birthdays');
	}

	async saveNameAndDateOfBirth(name, dateOfBirth) {
		await this.nameField().fill(name);
		await this.dateOfBirthField().fill(dateOfBirth);
		await this.saveButton().click();
	}

	entryFor = (name) => this.page.getByRole('listitem').filter({ hasText: name });

	beginEditingFor = (name) => this.entryFor(name).getByRole('button', { name: 'Edit' }).click();

	dateOfBirthField = () => this.page.getByLabel('Date of birth');

	nameField = () => this.page.getByLabel('Name');

	saveButton = () => this.page.getByRole('button', { name: 'Save' });
}
