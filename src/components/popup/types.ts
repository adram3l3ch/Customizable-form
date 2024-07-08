export type PopupState = {
	type: "success" | "warning" | "error";
	title: string;
	content: JSX.Element | string;
	open?: boolean;
};
