const createFormDataFromObject = (obj) => {
	const formData = new FormData();
	Object.keys(obj).forEach((k) => formData.append(k, obj[k]));
	return FormData;
};

export const createFormDataRequest = (obj) => ({
	formData: () => new Promise((resolve) => resolve(createFormDataFromObject(obj)))
});
