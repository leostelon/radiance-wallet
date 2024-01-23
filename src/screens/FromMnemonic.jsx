import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { createWallet } from "../utils/wallet";
import { BlueButton } from "../components/BlueButton.jsx";
import { toast } from "react-toastify";

export const FromMnemonic = () => {
	const [mnemonic, setMnemonic] = useState([]);

	function sM(m) {
		setMnemonic(m.split(" "));
	}

	useEffect(() => {}, []);

	return (
		<Box>
			<Box sx={{ textAlign: "center" }}>
				<h2>Paste passphrase</h2>
				<p>Paste your secret passphrase below</p>
			</Box>
			<Box>
				<TextField
					onChange={(e) => {
						sM(e.target.value);
					}}
					sx={{
						width: "100%",
						mt: 2,
					}}
					multiline
					rows={2}
				/>
			</Box>
			<Box
				sx={{
					my: 2,
				}}
			>
				<BlueButton
					onClick={async () => {
						console.log(mnemonic.length !== 12);
						if (!(mnemonic.length !== 12 || mnemonic.length !== 24))
							return toast("Please paste a valid passphrase", { type: "info" });
						const m = mnemonic.join(" ");
						await createWallet(m);
						window.location.replace("#/");
					}}
					title={"Continue"}
				/>
			</Box>
			<Box
				sx={{
					color: "blue",
					textAlign: "center",
					cursor: "pointer",
				}}
				onClick={() => {
					window.location.replace("#/mnemonic");
				}}
			>
				<small>Create Wallet?</small>
			</Box>
		</Box>
	);
};
