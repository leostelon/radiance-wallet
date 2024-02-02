import { Box } from "@mui/system";
import { Avatar } from "@mui/material";
import Logo from "../assets/logo-light.png";
import { useEffect, useRef, useState } from "react";
import { BlueButton } from "../components/BlueButton.jsx";
import { TitleNavbar } from "../components/TitleNavbar.jsx";
import { toast } from "react-toastify";
import { getWallet } from "../utils/wallet.js";

export const Password = () => {
	const [password, setPassword] = useState("");
	const passwordRef = useRef("");

	async function unlockWallet() {
		chrome.storage.local.get(["password"], (response) => {
			if (!response.password) response.password = "";
			if (passwordRef.current === response.password) {
				window.location.replace("#/index");
			} else {
				toast("Invalid password, try again.", { type: "error" });
			}
		});
	}

	async function checkWallet() {
		const wallet = await getWallet();
		if (!wallet || wallet === "") {
			window.location.replace("#/mnemonic");
		}
	}

	useEffect(() => {
		checkWallet();
		const node = document.getElementsByClassName("wallet-pass")[0];
		node.addEventListener("keyup", ({ key }) => {
			if (key === "Enter") {
				unlockWallet();
			}
		});
	}, []);

	return (
		<Box
			sx={{
				backgroundColor: "#473bc1",
				height: "100vh",
				width: "100vw",
				color: "white",
				display: "flex",
				flexDirection: "column",
				p: 2,
			}}
		>
			<TitleNavbar />
			<Box
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Avatar
					sx={{
						height: "55px",
						width: "55px",
						mb: 3,
						bgcolor: "#473bc1",
						p: 0.75,
					}}
					src={Logo}
				/>
				<h1 style={{ fontWeight: "600", fontSize: "24px" }}>
					Enter your password
				</h1>
				<Box
					className="default-text-input"
					sx={{
						width: "100%",
						backgroundColor: "white",
						padding: "6px 12px",
					}}
					mb={3}
					mt={3}
				>
					<input
						type="password"
						id={`title`}
						className="wallet-pass"
						placeholder="Enter password"
						value={password}
						onInput={(e) => {
							setPassword(e.target.value);
							passwordRef.current = e.target.value;
						}}
						style={{
							backgroundColor: "white",
							fontSize: "16px",
						}}
					/>
				</Box>
			</Box>
			<Box>
				<BlueButton
					title={"Unlock"}
					style={{
						backgroundColor: "#6f78ff",
						padding: "8px 14px",
						fontSize: "16px",
					}}
					onClick={unlockWallet}
				/>
			</Box>
		</Box>
	);
};
