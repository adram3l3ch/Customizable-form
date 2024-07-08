import styles from "./styles.module.scss";
import { FormProps } from "./";
import { Input } from "../input";
import { combineClassNames, useScreenSize } from "../../utils";

const Form = (props: FormProps) => {
	const { title, className, errors, inputs, onSubmit, onChange, values } = props;

	const [screenName] = useScreenSize();

	const getSize = (size: FormProps["inputs"][number]["size"]) => {
		if (size?.[screenName]) return size?.[screenName];
		if (screenName === "xl") return size?.lg || size?.md || size?.sm || size?.xs;
		if (screenName === "lg") return size?.md || size?.sm || size?.xs;
		if (screenName === "md") return size?.sm || size?.xs;
		if (screenName === "sm") return size?.xs;
	};

	return (
		<form
			className={combineClassNames([styles.container, className])}
			onSubmit={e => {
				e.preventDefault();
				onSubmit?.(values!);
			}}
		>
			<h1 className={styles.title}>{title}</h1>
			{inputs?.map(({ input, size }) => (
				<Input
					error={errors?.[input.name || ""]}
					className={styles[`grid-${getSize(size) || 12}`]}
					value={values?.[input.name || ""]}
					onChange={e => {
						onChange?.(input.name || "", e.target.value, e);
					}}
					key={input.name}
					{...input}
				/>
			))}
			<button className={styles.button} type="submit">
				Submit
			</button>
		</form>
	);
};

export default Form;
