import { fail } from '@sveltejs/kit';
// import { addNew, replace, has } from '../../lib/server/repository.js';

// addNew({ name: 'Hercules', dateOfBirth: '1994-02-02' });
// addNew({ name: 'Athena', dateOfBirth: '1989-01-01' });

// export const load = async ({fetch}) => ({
// 	const result = fetch('/api/birthdays');
// 	return { birthdays: getAll()}
// });

export const load = async ({ fetch }) => {
	const result = await fetch('/api/birthdays');
	return result.json();
};

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const id = data.get('id');
		const name = data.get('name');
		const dateOfBirth = data.get('dateOfBirth');

		let response;
		if (id) {
			response = await fetch(`/api/birthdays/${id}`, {
				method: 'PUT',
				body: JSON.stringify({ name, dateOfBirth })
			});
		} else {
			response = await fetch('/api/birthdays', {
				method: 'POST',
				body: JSON.stringify({ name, dateOfBirth })
			});
		}

		if (!response.ok) {
			const { message } = await response.json();
			return fail(422, {
				id,
				name,
				dateOfBirth,
				error: message
			});
		}
	}
};

// const fnEmpty = (value) => value === undefined || value === null || value.trim() === '';
// const fnValidateBirth = (dateOfBirth) => isNaN(Date.parse(dateOfBirth));
