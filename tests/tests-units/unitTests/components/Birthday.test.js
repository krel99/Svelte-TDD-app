import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Birthday from '../../../../src/lib/Birthday.svelte';

describe('Birthday Component - default actions', () => {
	const exampleProps = { name: 'Ares', dateOfBirth: '22-22-2222' };
	it('displays the name of the person', () => {
		render(Birthday, { ...exampleProps, name: 'Hercules' });

		expect(screen.queryByText('Hercules')).toBeVisible();
	});

	it('displays the date of birth', () => {
		render(Birthday, { ...exampleProps, dateOfBirth: '22-22-2022' });

		expect(screen.queryByText('22-22-2022')).toBeVisible();
	});
});
