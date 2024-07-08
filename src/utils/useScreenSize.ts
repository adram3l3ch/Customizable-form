import { useLayoutEffect, useState } from "react";
import { screenSizes } from "../constants";

type Screen = [keyof typeof screenSizes, number];

export const useScreenSize = () => {
	const [size, setSize] = useState<Screen>(["sm", screenSizes.xs]);

	useLayoutEffect(() => {
		const calculateSize = (width: number) => {
			const newSize = Object.entries(screenSizes).reduce(
				(acc, [name, size]) => {
					if (size <= width && +acc[1] < size) return [name, size];
					return acc;
				},
				["sm", screenSizes.xs],
			);
			setSize(newSize as Screen);
		};
		const handleResize = (e: UIEvent) => {
			const width = (e.target as Window).innerWidth;
			calculateSize(width);
		};

		calculateSize(window.innerWidth);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return size;
};
