import "../styles/Mnemonic.css";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { createMnemonic, createWallet } from "../utils/wallet";
import { BlueButton } from "../components/BlueButton.jsx";

export const Mnemonic = () => {
	const [mnemonic, setMnemonic] = useState([]);
	const mnemon = useRef();

	function sM() {
		const m = createMnemonic();
		setMnemonic(m.split(" "));
		mnemon.current = m;
	}

	useEffect(() => {
		sM();
	}, []);

	return (
		<Box>
			<Box sx={{ textAlign: "center" }}>
				<h2>Secret passphrase</h2>
				<p>Please note down the secret passphrase before proceeding.</p>
			</Box>
			<Box>
				<div className="mnemonic-grid">
					{mnemonic.map((item, index) => (
						<div key={index} className="mnemonic-item">
							{item}
						</div>
					))}
				</div>
			</Box>
			<Box>
				<BlueButton
					onClick={async () => {
						await createWallet(mnemon.current);
						window.location.replace("#/");
					}}
					title={"Continue"}
				/>
			</Box>
		</Box>
	);
};
