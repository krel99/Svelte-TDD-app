import { describe, it, expect, beforeEach } from 'vitest';
import { createBirthday } from '../../../../src/lib/factories/createBirthday';
import * as birthdayRepository from '../../../../src/lib/server/repository.js';
import { GET, POST } from '../../../../src/routes/api/birthdays/+server.js';
import { createRequest } from '../../../../src/lib/factories/createRequest.js';

const bodyOfResponse = (response) => response.json();

describe('Server', () => {
	describe('GET', () => {
		it('returns all the birthdays from the store', async () => {
			birthdayRepository.addNew(createBirthday('Hercyles', '2010-04-04'));
			birthdayRepository.addNew(createBirthday('Pares', '1999-05-05'));

			const { birthdays } = await bodyOfResponse(GET());
			expect(birthdays).toEqual([
				expect.objectContaining(createBirthday('Hercyles', '2010-04-04')),
				expect.objectContaining(createBirthday('Pares', '1999-05-05'))
			]);
		});
	});

	describe('POST', () => {
		beforeEach(birthdayRepository.clear);

		it('saves the birthday in the store', async () => {
			await POST({
				request: createRequest(createBirthday('Hercules', '1999-05-05'))
			});
			expect(birthdayRepository.getAll()).toHaveLength(1);
			expect(birthdayRepository.getAll()[0]).toMatchObject(
				createBirthday('Hercules', '1999-05-05')
			);
		});
		it('returns a json response with the data------', async () => {
			const response = await POST({
				request: createRequest(createBirthday('Hercules', '2009-03-01'))
			});
			// console.log(response);
			const responseBody = await bodyOfResponse(response);
			// console.log(responseBody);
			expect(responseBody).toMatchObject(createBirthday('Hercules', '2009-03-01'));
		});
		it('throws an error if the data is invalid', async () => {
			expect.hasAssertions();
			try {
				await POST({
					request: createRequest(createBirthday('Ares', ''))
				});
			} catch (error) {
				expect(error.status).toEqual(422);
				expect(error.body).toEqual({
					message: 'Please provide a date of birth in the YYYY-MM-DD format.'
				});
			}
		});
	});
});
