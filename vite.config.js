import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		reporter: 'verbose',
		environment: 'jsdom',
		setupFiles: ['src/vitest/cleanupDom.js', './src/vitest/registerMatchers.js'],
		restoreMocks: true
	}
});
