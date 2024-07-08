import { useId } from "react";
import { combineClassNames } from "../../utils";
import { InputProps } from "./";
import styles from "./styles.module.scss";

const Input = (props: InputProps) => {
	const {
		label,
		className,
		labelClassName,
		inputClassName,
		optionsClassName,
		error,
		options,
		inputLabel,
		required,
		...inputProps
	} = props;

	const id = useId();
	return (
		<div className={combineClassNames([styles.container, className, error && styles.error])}>
			{label && !inputLabel && (
				<label className={labelClassName} htmlFor={id}>
					{label} {required && <span>*</span>}
				</label>
			)}
			<div className={styles.input}>
				{!!options?.length && (
					<div className={optionsClassName}>
						{options?.map((option, i) => (
							<Input
								key={i}
								onChange={e => inputProps.onChange?.(e)}
								value={inputProps.value}
								{...option}
							/>
						))}
					</div>
				)}
				{!options?.length && inputProps.multiline && (
					<textarea {...inputProps} className={inputClassName} id={id} />
				)}
				{!options?.length && !inputProps.multiline && (
					<input
						checked={inputProps.isChecked?.(inputProps.value)}
						{...inputProps}
						className={inputClassName}
						id={id}
					/>
				)}
				{inputLabel && (
					<label htmlFor={id} className={labelClassName}>
						{label} {required && <span>*</span>}
					</label>
				)}
			</div>
			{error && (
				<div className={styles.error} aria-errormessage={error}>
					{error}
				</div>
			)}
		</div>
	);
};

export default Input;
