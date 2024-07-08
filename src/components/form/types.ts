import { ChangeEvent } from "react";
import { InputProps } from "../input";

type Sizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type FormProps = {
	title: string;
	inputs: {
		input: InputProps;
		size?: { sm?: Sizes; md?: Sizes; lg?: Sizes; xl?: Sizes; xs?: Sizes };
	}[];
	className?: string;
	errors?: { [key: string]: string | undefined };
	onSubmit?: (values: Record<string, any>) => void;
	values?: Record<string, any>;
	onChange?: (name: string, value: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onCancel?: () => void;
};
