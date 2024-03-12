import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Form from '../../../../src/lib/Form.svelte';

describe('birthday form basic functionality', () => {
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
		expect(field.name).toEqual('dateOfBirth');
	});

	it('name initially has a blank value', () => {
		render(Form);
		expect(screen.getByLabelText('Name')).toHaveValue('');
	});

	it('date initially has a blank value', () => {
		render(Form);
		expect(screen.getByLabelText('Date of birth')).toHaveValue('');
	});

	describe('id field', () => {
		it('contains a hidden field for the id if an id is given', () => {
			render(Form, { form: { id: '123' } });
			const form = screen.getByRole('form');
			expect(form.elements.id.value).toEqual('123');
		});

		it('does not include the id field if no id is present', () => {
			render(Form);
			const form = screen.getByRole('form');
			expect(form.elements.id).not.toBeDefined();
		});
	});

	describe('form validation errors', () => {
		it('displays a message', () => {
			render(Form, {
				form: {
					error: 'An error'
				}
			});
			expect(screen.queryByText('An error')).toBeVisible();
		});

		it('keeps the previous name value when an error occurs', () => {
			render(Form, {
				form: {
					name: 'Hercules',
					error: 'error message'
				}
			});
			expect(screen.getByLabelText('Name')).toHaveValue('Hercules');
		});

		it('keeps the previous date of birth value when an error occurs', () => {
			render(Form, {
				form: {
					dateOfBirth: '1999-09-09',
					error: 'error message'
				}
			});
			expect(screen.getByLabelText('Date of birth')).toHaveValue('1999-09-09');
		});
	});
});
