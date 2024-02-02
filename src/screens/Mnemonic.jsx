import "../styles/Mnemonic.css";
import { Box, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { createMnemonic, createWallet } from "../utils/wallet";
import { BlueButton } from "../components/BlueButton.jsx";
import { MdContentCopy } from "react-icons/md";
import { PrimaryGrey } from "../constant.js";

export const Mnemonic = () => {
	const [open, setOpen] = useState(false);
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
		<Box sx={{ p: 2 }}>
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
			<Tooltip
				title="Copied!"
				placement="top"
				open={open}
				onClose={() => setOpen(false)}
			>
				<Box
					sx={{
						color: "blue",
						cursor: "pointer",
						textAlign: "center",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
					onClick={() => {
						navigator.clipboard.writeText(mnemonic.join(" "));
						setOpen(true);
					}}
				>
					<small style={{ fontWeight: "600" }}>Copy</small>
					<MdContentCopy
						style={{
							cursor: "pointer",
							marginLeft: "8px",
						}}
						size={16}
					/>
				</Box>
			</Tooltip>

			<Box
				sx={{
					my: 2,
				}}
			>
				<BlueButton
					onClick={async () => {
						await createWallet(mnemon.current);
						window.location.replace("#/createpassword");
					}}
					title={"Continue"}
				/>
			</Box>
			<Box
				sx={{
					color: "blue",
					textAlign: "center",
					cursor: "pointer",
					textDecoration: "underline",
				}}
				onClick={() => {
					window.location.replace("#/frommnemonic");
				}}
			>
				<small>Import Wallet?</small>
			</Box>
		</Box>
	);
};
