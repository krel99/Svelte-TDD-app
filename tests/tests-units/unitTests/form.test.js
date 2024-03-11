import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Form from '../../../src/lib/Form.svelte';

describe('BirthdayForm', () => {
	it('displays a form', () => {
		render(Form);
		expect(screen.queryByRole('form')).toBeVisible();
	});

	it('has a post method', () => {
		render(Form);
		expect(screen.getByRole('form').method).toEqual('post');
	});

	it('displays a button to save', () => {
		render(Form);
		expect(screen.queryByRole('button')).toBeVisible();
	});

	it('displays a text field for the name', () => {
		render(Form);
		const field = screen.queryByLabelText('Name', { selector: 'input[type=text]' });
		expect(field).toBeVisible();
		expect(field.name).toEqual('name');
	});

	it('displays a text field for the date of birth', () => {
		render(Form);
		const field = screen.queryByLabelText('Date of birth', { selector: 'input[type=text]' });
		expect(field).toBeVisible();
		expect(field.name).toEqual('date of birth');
	});
});
