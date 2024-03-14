import { describe, it, expect, beforeEach, vi } from 'vitest';
import { load, actions } from '../../../../src/routes/birthdays/+page.server.js';
import { createFormDataRequest } from '../../../../src/lib/factories/formDataRequest';
import * as birthdayRepository from '../../../../src/lib/server/repository.js';
import { createBirthday } from '../../../../src/lib/factories/createBirthday.js';
import { fetchResponseOk } from '../../../../src/lib/factories/fetch.js';
import { fetchResponseError } from '../../../../src/lib/factories/fetchResponseError.js';

const performFormAction = (formData) =>
	actions.default({
		request: createFormDataRequest(formData)
	});

describe('/birthday load', () => {
	it('calls fetch at /api/birthdays', async () => {
		const fetch = vi.fn();
		fetch.mockResolvedValue(fetchResponseOk());
		await load({ fetch });
		expect(fetch).toHaveBeenCalledWith('/api/birthdays');
	});
	it('returns the response body', async () => {
		const birthdays = [
			createBirthday('Hercules', '1994-02-02'),
			createBirthday('Athena', '1989-01-01')
		];
		const fetch = vi.fn();
		fetch.mockResolvedValue(fetchResponseOk({ birthdays }));
		const result = await load({ fetch });
		expect(result).toEqual({ birthdays });
	});
	// todo 'returns a 422 if the POST request returns an error'
});

describe('/birthdays - default action', () => {
	const fetch = vi.fn();

	const performFormAction = (formData) =>
		actions.default({
			request: createFormDataRequest(formData),
			fetch
		});

	beforeEach(() => {
		fetch.mockResolvedValue(fetchResponseOk());
	});

	describe('when adding a new birthday', () => {
		it('requests data from POST /api/birthdays', async () => {
			await performFormAction(createBirthday('Zeus', '2009-02-02'));

			expect(fetch).toBeCalledWith('/api/birthdays', expect.objectContaining({ method: 'POST' }));
		});
		it('sends the birthday as the request body', async () => {
			await performFormAction(createBirthday('Zeus', '2009-02-02'));

			expect(fetch).toBeCalledWith(
				expect.anything(),
				expect.objectContaining({
					body: JSON.stringify({
						name: 'Zeus',
						dateOfBirth: '2009-02-02'
					})
				})
			);
		});
	});

	describe('when replacing an existing birthday', () => {
		it('requests data from PUT /api/birthdays/{id}', async () => {
			await performFormAction(
				createBirthday('Zeus', '2009-02-02', {
					id: '123'
				})
			);

			expect(fetch).toBeCalledWith(
				'/api/birthdays/123',
				expect.objectContaining({ method: 'PUT' })
			);
		});

		it('sends the birthday as the request body', async () => {
			await performFormAction(
				createBirthday('Zeus', '2009-02-02', {
					id: '123'
				})
			);

			expect(fetch).toBeCalledWith(
				expect.anything(),
				expect.objectContaining({
					body: JSON.stringify({
						name: 'Zeus',
						dateOfBirth: '2009-02-02'
					})
				})
			);
		});
	});
});
