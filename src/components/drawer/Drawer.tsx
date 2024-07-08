import MonacoEditor from "react-monaco-editor";
import { FormPropsText, InputPropsText } from "../../constants";
import { combineClassNames } from "../../utils";
import styles from "./styles.module.scss";
import { ComponentProps } from "react";

type DrawerProps = {
	isOpen: boolean;
	onToggle: VoidFunction;
	inputText: string;
	onInputTextChange: (value: string) => void;
	onInputSave: () => void;
	functionText: string;
	onFunctionTextChange: (value: string) => void;
	onFunctionSave: () => void;
};

const editorOptions: ComponentProps<typeof MonacoEditor>["options"] = {
	selectOnLineNumbers: true,
	fontSize: 14,
	automaticLayout: true,
	minimap: { enabled: false },
};

const Drawer = (props: DrawerProps) => {
	const {
		functionText,
		inputText,
		isOpen,
		onFunctionSave,
		onFunctionTextChange,
		onInputSave,
		onInputTextChange,
		onToggle,
	} = props;
	return (
		<section className={combineClassNames([styles.drawer, styles[isOpen ? "open" : ""]])}>
			<button className={styles.handle} onClick={onToggle}>{`<`}</button>
			<div tabIndex={-1}>
				<h2>Customize form</h2>
				<h4>
					Inputs: <span>FormProps</span>
				</h4>
				<code>
					{InputPropsText} {FormPropsText}
				</code>
				<MonacoEditor
					language="json"
					theme="vs-dark"
					value={inputText}
					options={editorOptions}
					onChange={onInputTextChange}
					className={styles.editor}
				/>
				<button className={styles.button} onClick={onInputSave}>
					Save Input
				</button>
				<h4>Validation function</h4>
				<MonacoEditor
					language="python"
					theme="vs-dark"
					value={functionText}
					options={editorOptions}
					onChange={onFunctionTextChange}
					className={styles.editor}
				/>
				<button className={styles.button} onClick={onFunctionSave}>
					Save Function
				</button>
			</div>
		</section>
	);
};

export default Drawer;
