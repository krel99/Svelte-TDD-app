import { describe, it, expect, beforeEach } from 'vitest';
import { createBirthday } from '../../../../src/lib/factories/createBirthday';
import * as birthdayRepository from '../../../../src/lib/server/repository.js';
import { GET } from '../../../../src/routes/api/birthdays/+server.js';

const bodyOfResponse = (response) => response.json();

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
