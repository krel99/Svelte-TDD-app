import { replace } from '../../../../lib/server/repository.js';
import { json, error } from '@sveltejs/kit';

export const PUT = async ({ request, params: { id } }) => {
	const { name, dateOfBirth } = await request.json();
	const result = replace(id, { name, dateOfBirth });

	if (result.error) throw error(422, result.error);
	return json(result);
};
