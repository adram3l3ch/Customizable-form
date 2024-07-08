import { FormProps } from "../components";
import styles from "../styles/styles.module.scss";

export const inputs: FormProps["inputs"] = [
	{ input: { label: "First Name", required: true, name: "firstName" }, size: { md: 6, xs: 12 } },
	{ input: { label: "Last Name", required: true, name: "lastName" }, size: { md: 6, xs: 12 } },
	{ input: { label: "Email Address", required: true, name: "email", type: "email" } },
	{
		input: {
			label: "Query type",
			optionsClassName: styles.input,
			options: [
				{
					label: "General Enquiry",
					type: "radio",
					inputLabel: true,
					name: "queryType",
					accessKey: "general",
					isChecked: value => value === "general",
					className: styles.radioOption,
				},
				{
					label: "Support request",
					type: "radio",
					inputLabel: true,
					name: "queryType",
					accessKey: "support",
					isChecked: value => value === "support",
					className: styles.radioOption,
				},
			],
			required: true,
			name: "queryType",
		},
	},
	{
		input: {
			label: "Message",
			multiline: true,
			rows: 6,
			required: true,
			name: "message",
		},
	},
	{
		input: {
			label: "I consent to being contacted by the team",
			type: "checkbox",
			inputLabel: true,
			required: true,
			name: "consent",
			isChecked: value => value,
			className: styles.consent,
		},
	},
];
