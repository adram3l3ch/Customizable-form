import { useEffect, useState } from "react";

export function useValidate<T extends object>(
	formData: T,
	validateFn: (values: T) => Partial<Record<keyof T, string>>,
) {
	type Errors = Partial<Record<keyof T, string>>;
	const [errors, setErrors] = useState<Errors>({});
	const [touched, setTouched] = useState(false);

	useEffect(() => {
		if (touched) handleSubmit();
	}, [formData, touched]);

	const checkForErrors = (errors: Errors) => {
		return Object.values(errors || {}).some(error => {
			if (Array.isArray(error)) return error.some(Boolean);
			return !!error;
		});
	};

	const handleSubmit = (cb?: () => void) => {
		setTouched(true);
		const errors = validateFn(formData);
		setErrors(ps => ({ ...ps, ...errors }));
		if (!checkForErrors(errors)) cb?.();
	};

	const reset = () => {
		setErrors({});
		setTouched(false);
	};

	return {
		errors,
		handleSubmit,
		reset,
	};
}
