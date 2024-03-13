import { getAll, addNew } from '../../../lib/server/repository';
import { replace } from '../../../lib/server/repository.js';
import { json, error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const { name, dateOfBirth } = await request.json();
	const result = addNew({ name, dateOfBirth });
	if (result.error) throw error(422, result.error);

	return json(result);
};

export const GET = () => json({ birthdays: getAll() });

export const PUT = async ({ request }) => {
	const { name, dateOfBirth, id } = await request.json();
	const result = replace(id, { name, dateOfBirth });

	if (result.error) throw error(422, result.error);
	return json(result);
};
