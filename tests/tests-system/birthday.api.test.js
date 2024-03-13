import { expect, test } from '@playwright/test';
// npm run test:pw
test('creating and reading a birthday', async ({ request }) => {
	const newBirthday = await request.post('/api/birthdays', {
		data: {
			name: 'Nyx',
			dateOfBirth: '1993-02-04'
		}
	});

	expect(newBirthday.status()).toBeGreaterThan(199);
	expect(newBirthday.status()).toBeLessThan(201);
	// expect(newBirthday.ok()).toBeTruthy();

	const birthdays = await request.get('/api/birthdays');
	expect(birthdays.ok()).toBeTruthy();
	expect(await birthdays.json()).toEqual({
		birthdays: expect.arrayContaining([
			{
				name: 'Nyx',
				dateOfBirth: '1993-02-04',
				id: expect.anything()
			}
		])
	});
});

test('updating a birthday', async ({ request }) => {
	const newBirthday = await request.post('/api/birthdays', {
		data: {
			name: 'Nyx',
			dateOfBirth: '1993-02-04'
		}
	});
	expect(newBirthday.status()).toBeGreaterThan(199);
	expect(newBirthday.status()).toBeLessThan(201);

	const { id } = await newBirthday.json();

	expect(id).toBeDefined;

	const birthdays = await request.put(`/api/birthdays/${id}`, {
		data: {
			name: 'Nyxx',
			dateOfBirth: '1992-01-03'
		}
	});

	// const birthdays = await request.put(`/api/birthdays`, {
	// 	data: {
	// 		name: 'Nyxx',
	// 		dateOfBirth: '1993-02-04',
	// 		id: id
	// 	}
	// });

	expect(birthdays.status()).toBeGreaterThan(199);
	expect(birthdays.status()).toBeLessThan(201);

	const updatedBirthdays = await request.get('/api/birthdays');
	expect(await updatedBirthdays.json()).toEqual({
		birthdays: expect.arrayContaining([
			{
				name: 'Nyxx',
				dateOfBirth: '1992-01-03',
				id: id
			}
		])
	});
});
