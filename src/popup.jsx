import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("react-target"));

function Popup() {
	return (
		<div
			style={{
				minHeight: "550px",
				maxHeight: "550px",
				minWidth: "300px",
				maxWidth: "300px",
			}}
		>
			<Router>
				<App />
			</Router>
		</div>
	);
}

root.render(<Popup />);
