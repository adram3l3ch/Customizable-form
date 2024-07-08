import { ChangeEvent, useState } from "react";
import { Drawer, Form, FormProps, usePopup } from "./components";
import { initialFormValues, initialFunctionText, inputs, validateFormValues } from "./constants";
import styles from "./styles/styles.module.scss";
import { useValidate } from "./utils";

const App = () => {
	const [input, setInput] = useState(inputs);
	const [inputText, setInputText] = useState(JSON.stringify(inputs, null, 4));
	const [validationFunctionText, setValidationFunctionText] = useState(initialFunctionText);
	const [validationFunction, setValidationFunction] = useState(() => validateFormValues);
	const [values, setValues] = useState(initialFormValues);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { errors, handleSubmit, reset } = useValidate(values, validationFunction);
	const { triggerPopup } = usePopup();

	const handleChange: FormProps["onChange"] = (name, value, e) => {
		if (name === "consent") {
			const {
				target: { checked },
			} = e as ChangeEvent<HTMLInputElement>;
			return setValues(ps => ({ ...ps, [name]: checked }));
		}
		if (name === "queryType") {
			const {
				target: { accessKey },
			} = e;
			return setValues(ps => ({ ...ps, [name]: accessKey }));
		}
		setValues(ps => ({ ...ps, [name]: value }));
	};

	const handleFormSubmit = () => {
		handleSubmit(() => {
			console.log(values);
			triggerPopup({
				title: "Message sent!",
				content: "Thanks for completing the form. We'll be in touch soon!",
			});
			reset();
			setValues(initialFormValues);
		});
	};

	const handleInputChange = () => {
		try {
			setInput(JSON.parse(inputText));
			setValues(initialFormValues);
			triggerPopup({ title: "Success", content: "Inputs saved successfully!" });
		} catch (error) {
			triggerPopup({
				title: "Parsing Error",
				content: "Invalid JSON found. Check your input!",
				type: "error",
			});
		}
	};

	const handleFunctionChange = () => {
		try {
			const newFunction = new Function("values", validationFunctionText);
			setValidationFunction(() => newFunction as typeof validateFormValues);
			triggerPopup({ title: "Success", content: "Validation function saved successfully!" });
		} catch (error) {
			triggerPopup({
				title: "Parsing Error",
				content: "Invalid function found. Check your input!",
				type: "error",
			});
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<Form
					title="Contact Us"
					errors={errors}
					inputs={input}
					className={styles.form}
					values={values}
					onChange={handleChange}
					onSubmit={handleFormSubmit}
				/>
			</div>
			<Drawer
				functionText={validationFunctionText}
				inputText={inputText}
				isOpen={isDrawerOpen}
				onFunctionSave={handleFunctionChange}
				onFunctionTextChange={setValidationFunctionText}
				onInputSave={handleInputChange}
				onInputTextChange={setInputText}
				onToggle={() => setIsDrawerOpen(ps => !ps)}
			/>
		</div>
	);
};

export default App;
