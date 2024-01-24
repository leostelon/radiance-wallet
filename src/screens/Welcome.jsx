import { Box } from "@mui/system";
import { PrimaryGrey } from "../constant";
import { Avatar } from "@mui/material";
import Logo from "../assets/logo.jpg";
import { useState } from "react";
import { BlueButton } from "../components/BlueButton.jsx";

export const Welcome = () => {
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
			<Box
				sx={{
					textAlign: "center",
					fontFamily: '"Moirai One", system-ui',
					borderBottom: "1px solid #4b4b4b",
				}}
			>
				<h1>
					radiance <small>®</small>
				</h1>
			</Box>
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
						bgcolor: "white",
						p: 0.75,
					}}
					src={Logo}
				/>
				<h1 style={{ color: "white", fontWeight: "600", fontSize: "24px" }}>
					Enter your password
				</h1>
				<Box
					className="default-text-input"
					sx={{ width: "100%", backgroundColor: "#222", padding: "6px 12px" }}
					mb={3}
					mt={3}
				>
					<input
						type="password"
						id={`title`}
						placeholder="Enter password"
						value={password}
						onInput={(e) => {
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
					title={"Unlock"}
					style={{
						backgroundColor: "rgb(171, 159, 242)",
						color: "black",
						padding: "8px 14px",
						fontSize: "16px",
					}}
				/>
			</Box>
		</Box>
	);
};
