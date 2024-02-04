import "../styles/Mnemonic.css";
import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
} from "@mui/material";
import { MdArrowBack, MdKey, MdOutlineLogout } from "react-icons/md";
import { PiPiggyBank } from "react-icons/pi";
import { PrimaryGrey } from "../constant.js";
import { useEffect, useState } from "react";

export const Settings = () => {
	const [checked, setChecked] = useState(true);
	let check;

	function lO() {
		chrome.storage.local.set({ address: "" }, function () {
			window.location.replace("#/mnemonic");
		});
	}

	function checkToggle() {
		chrome.storage.local.get(["savings"], (response) => {
			if (response.savings === undefined) response.savings = true;
			setChecked(response.savings);
			check = response.savings;
		});
	}

	function toggleSavings() {
		check = !check;
		chrome.storage.local.set({ savings: check }, () => {
			setChecked(check);
		});
	}

	useEffect(() => {
		checkToggle();
	}, []);

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
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<PiPiggyBank size={24} />
						</ListItemIcon>
						<ListItemText primary="Toggle Saving" />
						<ListItemSecondaryAction
							children={<Switch checked={checked} onChange={toggleSavings} />}
						/>
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
};
