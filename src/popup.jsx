import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("react-target"));

function Popup() {
	return <div>hello</div>;
}

root.render(<Popup />);
