import { fail } from '@sveltejs/kit';
import { addNew, getAll, replace, has } from '../../lib/server/repository.js';

addNew({ name: 'Hercules', dateOfBirth: '1994-02-02' });
addNew({ name: 'Athena', dateOfBirth: '1989-01-01' });

export const load = () => ({
	birthdays: getAll()
});

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const name = data.get('name');
		const dateOfBirth = data.get('dateOfBirth');
		// console.log(dateOfBirth); //WORKS

		if (fnEmpty(name)) {
			return fail(422, { id, dateOfBirth, error: 'Please provide a name.' });
		}
		if (fnValidateBirth(dateOfBirth)) {
			// console.log(dateOfBirth); WORKS
			return fail(422, {
				id,
				name,
				dateOfBirth,
				error: 'Please provide a date of birth in the YYYY-MM-DD format'
			});
		}

		if (id && !has(id)) {
			return fail(422, {
				error: 'An unknown ID was provided.'
			});
		}

		if (id) {
			replace(id, {
				name,
				dateOfBirth
			});
		} else {
			addNew({
				name,
				dateOfBirth
			});
		}
	}
};

const fnEmpty = (value) => value === undefined || value === null || value.trim() === '';
const fnValidateBirth = (dateOfBirth) => isNaN(Date.parse(dateOfBirth));
