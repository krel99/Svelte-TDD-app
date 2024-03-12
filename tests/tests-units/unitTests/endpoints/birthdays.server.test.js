import { describe, it, expect, beforeEach } from 'vitest';
import { load, actions } from '../../../../src/routes/birthdays/+page.server.js';
import { createFormDataRequest } from '../../../../src/lib/factories/formDataRequest';

describe('/birthday server', () => {
	describe('load', () => {
		it('returns a fixture of two items', () => {
			const result = load();
			expect(result.birthdays).toEqual([
				{ name: 'Hercules', dateOfBirth: '1994-02-02' },
				{ name: 'Athena', dateOfBirth: '1989-01-01' }
			]);
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
				console.log(result.data);
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
