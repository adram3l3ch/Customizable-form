import { createContext, useContext, useRef, useState } from "react";
import { combineClassNames } from "../../utils";
import styles from "./styles.module.scss";
import SuccessTick from "../../assets/success.svg";
import { PopupState } from "./types";

const initialState: PopupState = { type: "success", title: "", content: "", open: false };

export const PopupContext = createContext<{
	triggerPopup: (values: Partial<PopupState>) => void;
	closePopup: VoidFunction;
} | null>(null);

const PopupProvider = ({ children }: { children: JSX.Element }) => {
	const [popupState, setPopupState] = useState(initialState);
	const triggerTimeout = useRef(0);
	const closeTimeout = useRef(0);

	const triggerPopup = (values: Partial<PopupState>) => {
		clearTimeout(triggerTimeout.current);
		clearTimeout(closeTimeout.current);
		setPopupState(ps => ({ ...ps, ...values, open: true }));
		triggerTimeout.current = setTimeout(() => closePopup(), 5000);
	};

	const closePopup = () => {
		clearTimeout(closeTimeout.current);
		setPopupState(ps => ({ ...ps, open: false }));
		closeTimeout.current = setTimeout(() => setPopupState(initialState), 500);
	};

	return (
		<PopupContext.Provider value={{ triggerPopup, closePopup }}>
			{children}
			<section
				className={combineClassNames([
					styles.container,
					styles[popupState.type],
					styles[popupState.open ? "open" : ""],
				])}
			>
				<h5 className={styles.title}>
					<img src={SuccessTick} alt="success-tick" />
					{popupState.title}
				</h5>
				<div className={styles.content}>{popupState.content}</div>
			</section>
		</PopupContext.Provider>
	);
};

export const usePopup = () => {
	const state = useContext(PopupContext);
	return state!;
};

export default PopupProvider;
