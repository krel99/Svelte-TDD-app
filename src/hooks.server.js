import { addNew } from './lib/server/repository.js';

if (import.meta.env.MODE === 'development') {
	addNew({ name: 'Hercules', dateOfBirth: '1994-02-02' });
	addNew({ name: 'Athena', dateOfBirth: '1989-01-01' });
}
