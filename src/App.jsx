import "./App.css";
import { Routes, Route } from "react-router-dom";
import { User } from "./screens/User.jsx";
import { useEffect } from "react";
import { Mnemonic } from "./screens/Mnemonic.jsx";
import { FromMnemonic } from "./screens/FromMnemonic.jsx";
import { Settings } from "./screens/Settings.jsx";
import { RevealSecret } from "./screens/RevealSecret.jsx";
import { Password } from "./screens/Password.jsx";
import { CreatePassword } from "./screens/CreatePassword.jsx";
import { Index } from "./screens/Index.jsx";

function App() {
	useEffect(() => {
		return () => {};
	}, []);

	return (
		<Routes>
			<Route path="/" exact element={<Password />} />
			<Route path="/index" exact element={<Index />} />
			<Route path="/createpassword" exact element={<CreatePassword />} />
			<Route path="/mnemonic" exact element={<Mnemonic />} />
			<Route path="/frommnemonic" exact element={<FromMnemonic />} />
			<Route path="/settings" exact element={<Settings />} />
			<Route path="/revealsecret" exact element={<RevealSecret />} />
		</Routes>
	);
}

export default App;
