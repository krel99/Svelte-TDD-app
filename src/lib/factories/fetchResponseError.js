export const fetchResponseError = (errorMessage) => ({
	status: 'error',
	json: () => Promise.resolve({ message: errorMessage })
});
