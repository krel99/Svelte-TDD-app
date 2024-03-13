import { describe, it, expect, beforeEach } from 'vitest';
import { createBirthday } from '../../../../src/lib/factories/createBirthday';
import * as birthdayRepository from '../../../../src/lib/server/repository.js';
import { PUT } from '../../../../src/routes/api/birthdays/[id]/+server.js';
import { createRequest } from '../../../../src/lib/factories/createRequest.js';

const bodyOfResponse = (response) => response.json();

const storedId = () => birthdayRepository.getAll()[0].id;

describe('PUT', () => {
	beforeEach(() => {
		birthdayRepository.clear();
		birthdayRepository.addNew(createBirthday('Hercules', '2009-03-01'));
	});

	it('updates the birthday in the store', async () => {
		await PUT({
			request: createRequest(createBirthday('Hercules', '1999-03-01')),
			params: { id: storedId() }
		});
		// console.log(birthdayRepository.getAll());
		expect(birthdayRepository.getAll()).toHaveLength(1);
		expect(birthdayRepository.getAll()[0]).toMatchObject({
			name: 'Hercules',
			dateOfBirth: '1999-03-01'
		});
	});

	it('returns a json response with the data', async () => {
		const response = await PUT({
			request: createRequest(createBirthday('Hercules', '1999-03-01')),
			params: { id: storedId() }
		});
		const responseBody = await bodyOfResponse(response);
		// ! console.log(responseBody);

		expect(responseBody).toMatchObject(
			createBirthday('Hercules', '1999-03-01', {
				id: storedId()
			})
		);
	});

	it('throws an error if the data is invalid', async () => {
		expect.hasAssertions();
		try {
			await PUT({
				request: createRequest(createBirthday('Hercules', '')),
				params: { id: storedId() }
			});
		} catch (error) {
			expect(error.status).toEqual(422);
			expect(error.body).toEqual({
				message: 'Please provide a date of birth in the YYYY-MM-DD format.'
			});
		}
	});
});
