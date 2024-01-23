import "./App.css";
import { Routes, Route } from "react-router-dom";
import { User } from "./screens/User.jsx";
import { useEffect } from "react";
import { Mnemonic } from "./screens/Mnemonic.jsx";
import { FromMnemonic } from "./screens/FromMnemonic.jsx";

function App() {
	useEffect(() => {
		return () => {};
	}, []);

	return (
		<Routes>
			<Route path="/" exact element={<User />} />
			<Route path="/mnemonic" exact element={<Mnemonic />} />
			<Route path="/frommnemonic" exact element={<FromMnemonic />} />
		</Routes>
	);
}

export default App;
