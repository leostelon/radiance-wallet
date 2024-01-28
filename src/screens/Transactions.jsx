import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { VAULT_ADDRESS } from "../constant";
import { formatTimestampToHumanReadable } from "../utils/humanReadableTime";
import { useEffect, useState } from "react";
import { getTransactionsByAccount } from "../api/blockscout";
import { getWallet } from "../utils/wallet";
import Web3 from "web3";
import { shortText } from "../utils/shortText";

export const Transactions = () => {
	const [address, setAddress] = useState("");
	const [transactions, setTransactions] = useState([]);

	async function gT() {
		const a = await getWallet();
		setAddress(a);
		const res = await getTransactionsByAccount(a);
		setTransactions(res.result);
	}

	useEffect(() => {
		gT();
	}, []);

	return (
		<Box
			sx={{
				backgroundColor: "#fde9e9",
				p: 2,
			}}
		>
			<Box mt={4}>
				<h3 style={{ marginBottom: "8px" }}>All Activity</h3>
			</Box>
			<Box>
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
										{VAULT_ADDRESS.toLowerCase() === t.to.toLowerCase()
											? "savings"
											: shortText(t.from)}
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
	);
};
