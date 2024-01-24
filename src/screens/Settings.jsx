import "../styles/Mnemonic.css";
import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { MdArrowBack, MdKey, MdOutlineLogout } from "react-icons/md";
import { PrimaryGrey } from "../constant.js";

export const Settings = () => {
	function lO() {
		chrome.storage.local.set({ address: "" }, function () {
			window.location.replace("#/mnemonic");
		});
	}

	return (
		<Box>
			<Box sx={{ textAlign: "center", position: "relative" }}>
				<Box sx={{ position: "absolute" }}>
					<IconButton onClick={() => window.history.go(-1)}>
						<MdArrowBack size={24} />
					</IconButton>
				</Box>

				<h1 style={{ color: PrimaryGrey }}>Settings</h1>
			</Box>
			<List>
				<ListItem
					disablePadding
					onClick={() => (window.location = "#/revealsecret")}
				>
					<ListItemButton>
						<ListItemIcon>
							<MdKey size={24} />
						</ListItemIcon>
						<ListItemText primary="Reveal secret" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding onClick={lO}>
					<ListItemButton>
						<ListItemIcon>
							<MdOutlineLogout size={24} />
						</ListItemIcon>
						<ListItemText primary="Close Wallet" />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
};
