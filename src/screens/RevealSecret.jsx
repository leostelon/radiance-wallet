import "../styles/Mnemonic.css";
import { Box, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { BlueButton } from "../components/BlueButton.jsx";
import { MdFileCopy } from "react-icons/md";

export const RevealSecret = () => {
	const [open, setOpen] = useState(false);
	const [mnemonic, setMnemonic] = useState([]);
	const mnemon = useRef();

	function gM() {
		chrome.storage.local.get(["mnemonic"], (response) => {
			const m = response.mnemonic;
			setMnemonic(m.split(" "));
			mnemon.current = m;
		});
	}

	useEffect(() => {
		gM();
	}, []);

	return (
		<Box>
			<Box sx={{ textAlign: "center" }}>
				<h2>Secret passphrase</h2>
				<p>Please don't share your secret passphrase with anyone.</p>
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
			<Box sx={{ justifyContent: "center", color: "blue", display: "flex" }}>
				<Tooltip
					title="Copied!"
					placement="top"
					open={open}
					onClose={() => setOpen(false)}
				>
					<Box>
						<MdFileCopy
							style={{ marginRight: "4px" }}
							onClick={() => {
								navigator.clipboard.writeText(mnemon.current);
								setOpen(true);
							}}
						/>
						<small>Copy</small>
					</Box>
				</Tooltip>
			</Box>

			<Box
				sx={{
					my: 2,
				}}
			>
				<BlueButton
					onClick={async () => {
						window.history.go(-1);
					}}
					title={"Close"}
				/>
			</Box>
		</Box>
	);
};
