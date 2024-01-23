import { Box, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { shortText } from "../utils/shortText.js";

export const RecieveDialog = ({ isOpen, handleExternalClose }) => {
	const [open, setOpen] = useState(false);
	const [address, setAddress] = useState("");

	const handleClose = (event, reason) => {
		setOpen(false);
		if (reason && reason === "backdropClick") return;
		if (handleExternalClose) {
			handleExternalClose();
		}
	};

	const getAddress = async () => {
		// Read it using the storage API
		chrome.storage.local.get(["address"], function (res) {
			if (!res.address) res.address = "no address";
			setAddress(res.address);
		});
	};

	useEffect(() => {
		if (isOpen) {
			setOpen(isOpen);
		}
		getAddress();
	}, [isOpen]);
	return (
		<Dialog open={open} fullWidth maxWidth="xs" onClose={handleClose}>
			<Box
				sx={{
					p: 2,
					textAlign: "center",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<h1>Recieve</h1>
				<br />
				<br />
				<QRCode value={`${address}`} size={150} />
				<br />
				<p style={{ fontWeight: 500 }}>Scan using any wallet to pay.</p>
				<br />
				<Box
					sx={{
						borderRadius: 50,
						backgroundColor: "lightgreen",
						color: "darkgreen",
						display: "flex",
						height: "35px",
						width: "35px",
						alignItems: "center",
						justifyContent: "center",
						mb: 2,
					}}
				>
					<p>or</p>
				</Box>
				<Box
					onClick={() => {
						navigator.clipboard.writeText(address);
					}}
				>
					<h3>{shortText(address)}</h3>
					<small>Tap to copy address</small>
				</Box>
				<Box
					sx={{
						mt: 2,
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Box
						sx={{
							p: 1,
							cursor: "pointer",
							mb: 2,
							backgroundColor: "#4443FF",
							color: "white",
							borderRadius: 2,
							width: "100%",
							textAlign: "center",
						}}
						onClick={async () => {
							// Pay Option
							handleClose();
						}}
					>
						Close
					</Box>
				</Box>
			</Box>
		</Dialog>
	);
};
