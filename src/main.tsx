import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PopupProvider } from "./components/index.ts";

const root = createRoot(document.getElementById("root")!);

root.render(
	<React.StrictMode>
		<PopupProvider>
			<App />
		</PopupProvider>
	</React.StrictMode>,
);
