import "../styles/Mnemonic.css";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { createMnemonic } from "../utils/wallet";

export const Mnemonic = () => {
	const [mnemonic, setMnemonic] = useState([]);
	let mnemon;

	function sM() {
		const m = createMnemonic();
		setMnemonic(m.split(" "));
		mnemon = m;
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
		</Box>
	);
};
