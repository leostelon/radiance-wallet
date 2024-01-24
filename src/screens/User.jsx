import "../styles/User.css";
import {
	Avatar,
	Box,
	ListItem,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from "@mui/material";
import { PrimaryGrey } from "../constant.js";
import { MdAdd, MdOutlineArrowOutward, MdSettings } from "react-icons/md";
import { shortText } from "../utils/shortText.js";
import { useEffect, useState } from "react";
import Web3 from "web3";
// import { Notification } from "../components/Notification";
import Userbg from "../assets/user-bg.png";
import Logo from "../assets/logo.jpg";
import { PayDialog } from "../components/Transfer.jsx";
import { RecieveDialog } from "../components/Recieve.jsx";
// import { getTransactionsByAccount } from "../api/transaction";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { getWallet } from "../utils/wallet.js";
import { getTransactionsByAccount } from "../api/blockscout.js";
import { formatTimestampToHumanReadable } from "../utils/humanReadableTime.js";

export const User = () => {
	const [address, setAddress] = useState("");
	const [balance, setBalance] = useState("0");
	const [open, setOpen] = useState(false);
	const [payOpen, setPayOpen] = useState(false);
	const [recieveOpen, setRecieveOpen] = useState(false);
	const [transactions, setTransactions] = useState([]);

	async function getBalance(a) {
		try {
			const web3 = new Web3(
				"https://replicator-01.pegasus.lightlink.io/rpc/v1"
			);
			const b = await web3.eth.getBalance(a);
			setBalance(Number(Web3.utils.fromWei(b, "ether")).toFixed(4));
			gT(a);
		} catch (error) {
			console.log(error.message);
		}
	}

	function handleNotificationDialogClose() {
		setRecieveOpen(false);
		setPayOpen(false);
		setTimeout(() => {
			gT(address);
			getBalance(address);
		}, 1500);
	}

	async function gT(ad) {
		const res = await getTransactionsByAccount(ad);
		setTransactions(res.result);
	}

	async function gW() {
		const a = await getWallet();
		if (!a || a === undefined || a === "") {
			return window.location.replace("#/mnemonic");
		}
		setAddress(a);
		getBalance(a);
	}

	useEffect(() => {
		gW();
		let connected = false;
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				height: "100vh",
				width: "100vw",
				justifyContent: "center",
			}}
		>
			{/* <Notification
				isOpen={notification}
				handleExternalClose={handleNotificationDialogClose}
				data={notifData}
			/> */}
			<PayDialog
				isOpen={payOpen}
				handleExternalClose={handleNotificationDialogClose}
			/>
			<RecieveDialog
				isOpen={recieveOpen}
				handleExternalClose={handleNotificationDialogClose}
			/>
			<Box
				sx={{
					backgroundColor: "#FDE9E9",
					maxWidth: "300px",
					minWidth: "300px",
					width: "100%",
					p: 2,
					background: `url("${Userbg}")`,
					backgroundPosition: "top",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}
			>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Box display={"flex"} alignItems="center" mt={2} mb={10}>
						<Avatar
							sx={{
								height: "35px",
								width: "35px",
								mr: 2,
								bgcolor: "white",
								p: 0.75,
							}}
							src={Logo}
						/>
						<Tooltip
							title="Copied!"
							placement="top"
							open={open}
							onClose={() => setOpen(false)}
						>
							<h1
								onClick={() => {
									navigator.clipboard.writeText(address);
									setOpen(true);
								}}
								style={{ cursor: "pointer" }}
							>
								{shortText(address)}
							</h1>
						</Tooltip>
					</Box>
					<Box mt={2}>
						<MdSettings
							style={{
								height: "25px",
								width: "25px",
								color: "white",
								cursor: "pointer",
							}}
							onClick={() => (window.location = "#/settings")}
						/>
					</Box>
				</Box>
				<Box
					sx={{
						borderRadius: 4,
						mt: 2,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "white",
						p: 3,
					}}
				>
					<Box flex={1}>
						<p style={{ color: PrimaryGrey }}>Total balance:</p>
						<h2 style={{ paddingTop: "12px" }}>{balance}ETH</h2>
					</Box>
					<Avatar sx={{ height: "50px", width: "50px", mr: 2 }} />
				</Box>
				<Box
					sx={{
						display: "flex",
						mt: 2,
						fontWeight: 500,
					}}
				>
					<Box
						sx={{
							backgroundColor: "black",
							color: "white",
							mr: 1,
						}}
						className={"user-action-button"}
						onClick={() => setRecieveOpen(true)}
					>
						<MdAdd />
						<Box ml={1}>Add Money</Box>
					</Box>
					<Box
						sx={{
							backgroundColor: "white",
						}}
						className={"user-action-button"}
						onClick={() => setPayOpen(true)}
					>
						<MdOutlineArrowOutward color="black" />
						<Box ml={1}>Transfer</Box>
					</Box>
				</Box>
				<Box mt={4}>
					<h3 style={{ marginBottom: "8px" }}>All Activity</h3>
				</Box>
				<Box
					sx={{
						backgroundColor: "#fde9e9",
					}}
				>
					{transactions.map((t, i) => {
						return (
							<ListItem
								key={i}
								secondaryAction={
									<h4>
										{Number(Web3.utils.fromWei(t.value, "ether")).toFixed(2)}ETH
									</h4>
								}
								sx={{
									cursor: "pointer",
								}}
								onClick={() =>
									window.open(
										`https://pegasus.lightlink.io/tx/${t.hash}`,
										"_blank"
									)
								}
							>
								<ListItemIcon>
									<Box
										sx={{
											backgroundColor: "white",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											borderRadius: "50%",
											p: 1,
										}}
									>
										{address.toLowerCase() === t.from.toLowerCase() ? (
											<GoArrowUpRight size={16} color="red" />
										) : (
											<GoArrowDownLeft size={16} color="green" />
										)}
									</Box>
								</ListItemIcon>
								<ListItemText
									primary={
										<p
											style={{
												fontWeight: "600",
												fontSize: "14px",
											}}
										>
											{address.toLowerCase() === t.from.toLowerCase()
												? "To"
												: "From"}
											&nbsp;
											{shortText(t.from)}
										</p>
									}
									secondary={
										<small style={{ fontSize: "10px" }}>
											{formatTimestampToHumanReadable(t.timeStamp * 1000)}
										</small>
									}
								/>
							</ListItem>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};
