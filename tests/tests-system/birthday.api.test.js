import { expect, test } from '@playwright/test';

const URL = 'api/birthdays';

test('creating and reading birthday (API-POST/GET)', async ({ request }) => {
	const newBirthday = await request.post(URL, {
		data: {
			name: 'Nyx',
			dateOfBirth: '1995-05-05'
		}
	});
	expect(newBirthday.ok()).toBeTruthy();

	const birthdays = await request.get(URL);
	expect(birthdays.ok()).toBeTruthy();
	expect(await birthdays.json()).toEqual({
		birthdays: expect.arrayContaining([
			{ name: 'Nyx', dateOfBirth: '1995-05-05', id: expect.anything() }
		])
	});
});

test('updating a birthday (API-PUT)', async ({ request }) => {
	const newBirthday = await request.post(URL, {
		data: {
			name: 'Nyx',
			dateOfBirth: '1995-05-05'
		}
	});
	expect(newBirthday.ok()).toBeTruthy();
	const { id } = await newBirthday.json();
	const birthdays = await request.put(`${URL}/${id}`, {
		data: {
			name: 'Nyxx',
			dateOfBirth: '1995-05-05'
		}
	});
	expect(birthdays.ok()).toBeTruthy();

	const updatedBirthdays = await request.get(URL);
	expect(await updatedBirthdays.json()).toEqual({
		birthdays: expect.arrayContaining([{ name: 'Nyxx', dateOfBirth: '1995-05-05', id }])
	});
});
