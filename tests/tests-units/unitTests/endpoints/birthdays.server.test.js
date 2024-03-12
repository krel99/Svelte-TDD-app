import { describe, it, expect, beforeEach } from 'vitest';
import { load, actions } from '../../../../src/routes/birthdays/+page.server.js';
import { createFormDataRequest } from '../../../../src/lib/factories/formDataRequest';
import * as birthdayRepository from '../../../../src/lib/server/repository.js';
import { createBirthday } from '../../../../src/lib/factories/createBirthday.js';

describe('/birthday server', () => {
	describe('load', () => {
		it('returns a fixture of two items', () => {
			const result = load();
			expect(result.birthdays).toEqual([
				expect.objectContaining({ name: 'Hercules', dateOfBirth: '1994-02-02' }),
				expect.objectContaining({ name: 'Athena', dateOfBirth: '1989-01-01' })
			]);
		});
	});

	describe('/birthdays - default action', () => {
		beforeEach(birthdayRepository.clear);

		const storedId = () => birthdayRepository.getAll()[0].id;

		const performFormAction = (formData) =>
			actions.default({
				request: createFormDataRequest(formData)
			});

		it('saves unique ids onto each new birthday', async () => {
			const request = createBirthday('Zeus', '2009-02-02');
			await performFormAction(request);
			await performFormAction(request);
			expect(birthdayRepository.getAll()[0].id).not.toEqual(birthdayRepository.getAll()[1].id);
		});

		it('updates an entry that shares same id', async () => {
			await performFormAction(createBirthday('Zeus', '2009-02-02'));
			await performFormAction(
				createBirthday('Zeus Ex', '2007-02-02', {
					id: storedId()
				})
			);
			expect(birthdayRepository.getAll()).toHaveLength(1);
			expect(birthdayRepository.getAll()).toContainEqual({
				id: storedId(),
				name: 'Zeus Ex',
				dateOfBirth: '2007-02-02'
			});
		});
	});

	describe('server-side validations', () => {
		describe('when the name is not provided', () => {
			let result;

			beforeEach(async () => {
				const request = createFormDataRequest({
					name: '',
					dateOfBirth: '2024-01-01'
				});

				result = await actions.default({ request });
			});

			it('does not save the birthday', () => {
				expect(load().birthdays).not.toContainEqual(
					expect.objectContaining({
						name: '',
						dateOfBirth: '2024-01-01'
					})
				);
			});

			it('returns 422 err', () => {
				expect(result.status).toEqual(422);
			});

			it('returns message about an error', () => {
				expect(result.data.error).toEqual('Please provide a name.');
			});

			it('returns the date back', () => {
				expect(result.data).toHaveProperty('dateOfBirth', '2024-01-01');
			});
		});
		describe('when the date is in the wrong format', () => {
			let result;

			beforeEach(async () => {
				const request = createFormDataRequest({
					name: 'Troll',
					dateOfBirth: 'blblbla'
				});

				result = await actions.default({ request });
			});
			it('does not save the birthday', () => {
				expect(load().birthdays).not.toContainEqual(
					expect.objectContaining({
						name: '',
						dob: '2009-02-02'
					})
				);
			});
			it('returns a 422 error', () => {
				expect(result.status).toEqual(422);
			});

			it('returns an error message', () => {
				expect(result.data.error).toEqual(
					'Please provide a date of birth in the YYYY-MM-DD format'
				);
			});

			it('returns the name back', () => {
				expect(result.data).toHaveProperty('name', 'Troll');
			});
		});
	});
});
