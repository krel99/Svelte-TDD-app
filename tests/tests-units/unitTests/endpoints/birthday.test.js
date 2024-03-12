import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from '../../../../src/routes/birthdays/+page.svelte';

describe('/birthdays', () => {
	const birthdays = [
		{ name: 'Hercules', dateOfBirth: '1994-02-02' },
		{ name: 'Athena', dateOfBirth: '1989-01-01' }
	];

	it('displays all the birthdays passed to it', () => {
		render(Page, { data: { birthdays } });
		expect(screen.queryByText('Hercules')).toBeVisible();
		expect(screen.queryByText('Athena')).toBeVisible();
	});

	it('displays a form for adding new birthdays', () => {
		render(Page, { data: { birthdays } });
		expect(screen.getByRole('form')).toBeVisible();
	});

	it('passes any form information to the Form', () => {
		render(Page, {
			data: { birthdays },
			form: { error: 'An error' }
		});
		expect(screen.queryByText('An error')).toBeVisible();
	});
});
