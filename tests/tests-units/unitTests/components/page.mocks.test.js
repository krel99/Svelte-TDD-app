import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { createBirthday } from '../../../../src/lib/factories/createBirthday.js';
import Page from '../../../../src/routes/birthdays/+page.svelte';

vi.mock('./Birthday.svelte');
describe('/birthdays - mock', () => {
	const birthdays = [
		createBirthday('Hercules', '1994-02-02', {
			id: '123'
		}),
		createBirthday('Athne', '1900-02-02', {
			id: '345'
		})
	];
	it('displays a Birthday component for each birthday', () => {
		render(Page, { data: { birthdays } });
		expect(screen.queryByText(/Hercules/)).toBeVisible;
		expect(screen.queryByText(/1994-02-02/)).toBeVisible;
		expect(screen.queryByText(/Athne/)).toBeVisible;
		expect(screen.queryByText(/1900-02-02/)).toBeVisible;
	});
});
