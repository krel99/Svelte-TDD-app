import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig(({ mode }) => ({
	plugins: [svelte()],
	resolve: {
		conditions: mode === 'test' ? ['browser'] : []
	},
	test: {
		environment: 'happy-dom',
		setupFiles: ['./tests/setup/vitest-setup.js'],
		testDir: 'tests/tests-units',
		include: ['tests/tests-units/**/*.{test,spec}.{js,ts}'],
		restoreMocks: true,
		reporter: 'verbose'
	}
}));
