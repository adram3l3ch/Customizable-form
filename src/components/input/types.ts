import { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export type BaseProps = {
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

export type TextInputProps = {
	multiline?: false;
} & InputHTMLAttributes<HTMLInputElement>;

export type AreaInputProps = {
	multiline: true;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export type InputProps = BaseProps & (TextInputProps | AreaInputProps);
