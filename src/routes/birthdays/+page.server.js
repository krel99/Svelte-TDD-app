const db = [];

const addNew = (item) => db.push(item);

addNew({ name: 'Hercules', dateOfBirth: '1994-02-02' });
addNew({ name: 'Athena', dateOfBirth: '1989-01-01' });

export const load = () => ({
	birthdays: Array.from(db)
});

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		addNew({
			name: data.get('name'),
			dateOfBirth: data.get('date of birth')
		});
	}
};
