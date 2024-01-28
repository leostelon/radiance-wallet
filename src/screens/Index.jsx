import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { MdHome } from "react-icons/md";
import { PiVault } from "react-icons/pi";
import { RiFileList3Line } from "react-icons/ri";
import { User } from "./User.jsx";
import { Vault } from "./Vault.jsx";
import { Transactions } from "./Transactions.jsx";

export const Index = () => {
	const [index, setIndex] = useState(0);
	const screens = [<User />, <Vault />, <Transactions />];

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				maxHeight: "100vh",
				height: "100vh",
				position: "relative",
			}}
		>
			<Box
				sx={{
					flex: 1,
					overflowY: "scroll",
				}}
			>
				{screens[index]}
			</Box>
			<Box
				sx={{
					position: "absolute",
					bottom: 0,
					p: 1,
					display: "flex",
					justifyContent: "space-between",
					width: "100vw",
					background: "rgba(0,0,0,0.1)",
					backdropFilter: " blur(10px)",
					borderTopLeftRadius: "32px",
					borderTopRightRadius: "32px",
				}}
			>
				<Box className="nav-menu-item">
					<IconButton onClick={() => setIndex(0)}>
						<MdHome />
					</IconButton>
				</Box>
				<Box className="nav-menu-item">
					<IconButton onClick={() => setIndex(1)}>
						<PiVault />
					</IconButton>
				</Box>
				<Box className="nav-menu-item">
					<IconButton onClick={() => setIndex(2)}>
						<RiFileList3Line />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
};
