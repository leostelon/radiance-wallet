import { Box, CircularProgress, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Web3 from "web3";

export const PayDialog = ({ isOpen, handleExternalClose }) => {
	const [open, setOpen] = useState(false);
	const [amount, setAmount] = useState("");
	const [address, setAddress] = useState("");
	const [paymentLoading, setPaymentLoading] = useState(false);

	const handleClose = (event, reason) => {
		setOpen(false);
		if (reason && reason === "backdropClick") return;
		if (handleExternalClose) {
			handleExternalClose();
		}
	};

	async function pay() {
		try {
			setPaymentLoading(true);
			const web3 = new Web3(
				"https://replicator-01.pegasus.lightlink.io/rpc/v1"
			);

			const from = localStorage.getItem("address");
			const value = Web3.utils.toWei(amount, "ether");

			// Gas Calculation
			const gasPrice = await web3.eth.getGasPrice();

			const res = await web3.eth.sendTransaction({
				from,
				to: address,
				value,
				gasPrice,
			});
			console.log("res here", res);
			setPaymentLoading(false);
		} catch (error) {
			console.log(error.message);
			setPaymentLoading(false);
		}
	}

	useEffect(() => {
		if (isOpen) {
			setOpen(isOpen);
		}
	}, [isOpen]);
	return (
		<Dialog open={open} fullWidth maxWidth="xs" onClose={handleClose}>
			<Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
				<Box sx={{ position: "relative" }}>
					<h2>Pay</h2>
					<Box
						sx={{
							position: "absolute",
							backgroundColor: "lightgrey",
							cursor: "pointer",
							height: "30px",
							width: "30px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							borderRadius: "50%",
							top: 0,
							right: 0,
						}}
						onClick={handleClose}
					>
						<MdClose />
					</Box>
				</Box>
				<Box>
					<Box mt={2} maxWidth={"420px"} textAlign={"start"}>
						<h3>Address</h3>
						<Box
							className="default-text-input"
							sx={{ width: "100%" }}
							mb={2}
							mt={1}
						>
							<input
								type="text"
								id={`title`}
								placeholder="Enter Address"
								value={address}
								onInput={(e) => {
									setAddress(e.target.value);
								}}
							/>
						</Box>
					</Box>
					<Box mt={2} maxWidth={"420px"} textAlign={"start"}>
						<h3>Amount</h3>
						<Box
							className="default-text-input"
							sx={{ width: "100%" }}
							mb={2}
							mt={1}
						>
							<input
								type="text"
								id={`title`}
								placeholder="Enter Amount"
								value={amount}
								onInput={(e) => {
									setAmount(e.target.value);
								}}
							/>
						</Box>
					</Box>
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
							pay();
						}}
					>
						{paymentLoading ? (
							<CircularProgress size={"15px"} sx={{ color: "white" }} />
						) : (
							"Pay Now"
						)}
					</Box>
				</Box>
			</Box>
		</Dialog>
	);
};
