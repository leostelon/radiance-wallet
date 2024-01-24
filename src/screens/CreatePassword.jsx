import { Box } from "@mui/system";
import { PrimaryGrey } from "../constant";
import { useState } from "react";
import { BlueButton } from "../components/BlueButton.jsx";
import { TitleNavbar } from "../components/TitleNavbar.jsx";
import { toast } from "react-toastify";

export const CreatePassword = () => {
	const [password, setPassword] = useState("");
	return (
		<Box
			sx={{
				backgroundColor: "#333333",
				height: "100vh",
				width: "100vw",
				color: PrimaryGrey,
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
				<p style={{ color: "white" }}>
					Create a password to unlock your wallet
				</p>
				<Box
					className="default-text-input"
					sx={{ width: "100%", backgroundColor: "#222", padding: "6px 12px" }}
					mb={3}
					mt={1}
				>
					<input
						type="password"
						id={`title`}
						placeholder="Enter password"
						value={password}
						onInput={async (e) => {
							setPassword(e.target.value);
						}}
						style={{
							backgroundColor: "#222",
							color: "white",
							fontSize: "16px",
						}}
					/>
				</Box>
			</Box>
			<Box>
				<BlueButton
					title={"Continue"}
					style={{
						backgroundColor: "rgb(171, 159, 242)",
						color: "black",
						padding: "8px 14px",
						fontSize: "16px",
					}}
					onClick={() => {
						if (!password || password === "")
							return toast("Please set a valid password", { type: "info" });
						// Plain password is stored in chrome storage
						// No hashing is performed, neither the wallet is password protected
						chrome.storage.local.set({ password }, () => {
							window.location.replace("#/user");
						});
					}}
				/>
			</Box>
		</Box>
	);
};
