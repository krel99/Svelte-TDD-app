export const createBirthday = (name, dateOfBirth, extra = {}) => ({
	name,
	dateOfBirth,
	...extra
});
