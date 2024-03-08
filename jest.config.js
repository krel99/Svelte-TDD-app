module.exports = {
	transform: {
		'^.+\\.svelte$': 'svelte-jester'
	},
	moduleFileExtensions: ['js', 'svelte'],
	extensionsToTreatAsEsm: ['svelte'],
	testEnvironment: 'happy-dom',
	setupFilesAfterEnv: ['<rootDir>/tests/setup/jest-dom.js']
};
