import { describe, it, expect } from 'vitest';
import { load } from '../../../src/routes/birthdays/+page.server';
// import { load, actions } from '../../../src/routes/birthdays/+page.server';
// import { createFormDataRequest } from '../../../src/lib/factories/formDataRequest';

describe('/birthdays - load', () => {
	it('returns a fixture of two items', () => {
		const result = load();
		expect(result.birthdays).toEqual([
			{ name: 'Hercules', dateOfBirth: '1994-02-02' },
			{ name: 'Athena', dateOfBirth: '1989-01-01' }
		]);
	});
});
