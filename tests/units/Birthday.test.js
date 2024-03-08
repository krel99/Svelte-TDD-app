import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Birthday from '../../src/lib/Birthday.svelte';

describe('Birthday', () => {
	it('renders a simple Svelte component', async () => {
		const Component = `
	  <div>Hello, world!</div>
	`;
		await render(Component);
		expect(screen.getByText('Hello, world!')).toBeInTheDocument();
	});
	it('displays the name of the person', () => {
		render(Birthday, { name: 'Hercules' });
		expect(screen.queryByText('Hercules')).toBeVisible;
	});
	it('displays the date of the birth', () => {
		render(Birthday, { dateOfBirth: '1994-20-20' });
		expect(screen.queryByText('1994-20-20')).toBeVisible;
	});
});
