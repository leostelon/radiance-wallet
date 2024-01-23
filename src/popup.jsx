import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("react-target"));

function Popup() {
	return (
		<div>
			<div>
				<p>Hello World!</p>
				<p>Extension is working</p>
			</div>
		</div>
	);
}

root.render(<Popup />);
