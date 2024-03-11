import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Form from '../../../../src/lib/Form.svelte';

describe('Birthday Form', () => {
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

	it('name initially has a blank value', () => {
		render(Form);
		expect(screen.getByLabelText('Name')).toHaveValue('');
	});

	it('date initially has a blank value', () => {
		render(Form);
		expect(screen.getByLabelText('Date')).toHaveValue('');
	});
});

describe('form validation errors', () => {
	it('displays a message', () => {
		render(Form, {
			form: {
				error: 'An error'
			}
		});
		expect(screen.queryByText('An Error')).toBeVisible();
	});

	it('keeps the previous name value when an error occurs', () => {
		render(Form, {
			form: {
				name: 'Hercules',
				error: 'error message'
			}
		});
		expect(screen.queryByLabelText('Name').toHaveValue('Hercules'));
	});

	it('keeps the previous date of birth value when an error occurs', () => {
		render(Form, {
			form: {
				dateOfBirth: '1999-09-09',
				error: 'error message'
			}
		});
		expect(screen.queryByLabelText('Date of birth').toHaveValue('1999-09-09'));
	});
});
