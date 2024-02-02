import { Box } from "@mui/material";
import { useEffect } from "react";
import { getWallet } from "../utils/wallet";
import WelcomeFrame from "../assets/welcome-frame.png";
import { BlueButton } from "../components/BlueButton.jsx";

export const Welcome = () => {
	async function checkWallet() {
		const wallet = await getWallet();
		if (wallet !== "") {
			window.location.replace("#/password");
		}
	}

	useEffect(() => {
		checkWallet();
	}, []);

	return (
		<Box
			sx={{
				background: `url('${WelcomeFrame}')`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				height: "100vh",
				position: "relative",
			}}
		>
			<Box
				sx={{
					position: "absolute",
					bottom: "32px",
					width: "100vw",
					padding: "8px",
				}}
			>
				<BlueButton
					title={"Continue"}
					onClick={() => {
						window.location.replace("#/mnemonic");
					}}
				/>
			</Box>
		</Box>
	);
};
