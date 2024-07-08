export const initialFunctionText = `const errors = {};
const EMAIL_REGEX = ${/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/};

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
`;

export const FormPropsText = `
type Sizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type FormProps = {
	input: InputProps;
	size?: { sm?: Sizes; md?: Sizes; lg?: Sizes; xl?: Sizes; xs?: Sizes };
}[];`;

export const InputPropsText = `type BaseProps = {
	label?: string;
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	optionsClassName?: string;
	error?: string;
	name?: string;
	inputLabel?: boolean;
	options?: InputProps[];
	onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	isChecked?: (value: any) => boolean;
};

type TextInputProps = { multiline?: false;} & InputHTMLAttributes<HTMLInputElement>;

type AreaInputProps = { multiline: true;} & TextareaHTMLAttributes<HTMLTextAreaElement>;

type InputProps = BaseProps & (TextInputProps | AreaInputProps);
`;
