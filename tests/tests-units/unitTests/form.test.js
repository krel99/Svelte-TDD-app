import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Form from '../../../src/lib/Form.svelte';

describe('BirthdayForm', () => {
	it('displays a form', () => {
		render(Form);
		expect(screen.queryByRole('form')).toBeVisible();
	});
});
