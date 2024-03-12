import { fail } from '@sveltejs/kit';
import { addNew, getAll } from '../../lib/server/repository.js';

addNew({ name: 'Hercules', dateOfBirth: '1994-02-02' });
addNew({ name: 'Athena', dateOfBirth: '1989-01-01' });

export const load = () => ({
	birthdays: getAll()
});

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const dateOfBirth = data.get('dateOfBirth');
		// console.log(dateOfBirth); WORKS

		if (fnEmpty(name)) {
			return fail(422, { dateOfBirth, error: 'Please provide a name.' });
		}
		if (fnValidateBirth(dateOfBirth)) {
			// console.log(dateOfBirth); WORKS
			return fail(422, {
				name,
				dateOfBirth,
				error: 'Please provide a date of birth in the YYYY-MM-DD format'
			});
		}

		addNew({
			name: data.get('name'),
			dateOfBirth: data.get('dateOfBirth')
		});
	}
};

const fnEmpty = (value) => value === undefined || value === null || value.trim() === '';
const fnValidateBirth = (dateOfBirth) => isNaN(Date.parse(dateOfBirth));
