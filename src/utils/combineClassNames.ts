export const combineClassNames = (classNames?: (string | undefined)[]) => {
	return classNames?.filter(Boolean).join(" ");
};
