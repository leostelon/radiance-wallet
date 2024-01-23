import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { User } from "./screens/User.jsx";
import { createWallet } from "./utils/wallet.js";
import { useEffect } from "react";

function App() {
	useEffect(() => {
		createWallet();
		return () => {};
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/popup.html" exact element={<User />} />
			</Routes>
		</Router>
	);
}

export default App;
