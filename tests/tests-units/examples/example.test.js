import { test, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import Example from './Example.svelte';

test('adds 1 + 2 to equal 3', () => {
	expect(1 + 2).toBe(3);
});

test('dom test', () => {
	document.body.innerHTML = `<button>My button</button>`;
	const button = document.querySelector('button');
	expect(button?.innerText).toEqual('My button');
});

test('renders simple component', () => {
	render(Example, { name: 'Svelte' });
	expect(document.body).toHaveTextContent('Hello, Svelte!');
});
