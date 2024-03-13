import { getAll } from '../../../lib/server/repository';
import { json } from '@sveltejs/kit';

export const GET = () => json({ birthdays: getAll() });
