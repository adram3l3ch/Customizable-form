export const initialFormValues = {
	firstName: "",
	lastName: "",
	email: "",
	queryType: "",
	message: "",
	consent: false,
};

export function validateFormValues(values: typeof initialFormValues) {
	const errors: Partial<Record<keyof typeof initialFormValues, string>> = {};
	const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	errors.firstName = !values.firstName ? "This field is required" : undefined;
	errors.lastName = !values.lastName ? "This field is required" : undefined;
	errors.email = !values.email
		? "This field is required"
		: !values.email?.match(EMAIL_REGEX)
			? "Please enter a valid email address"
			: undefined;
	errors.message = !values.message ? "This field is required" : undefined;
	errors.queryType = !values.queryType ? "Please select a query type" : undefined;
	errors.consent = !values.consent ? "To submit this form, please consent to being contacted" : undefined;

	return errors;
}
