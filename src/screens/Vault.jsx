import "../styles/Vault.css";
import { Box, Divider, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BlueButton } from "../components/BlueButton.jsx";
import Lightlink_logo from "../assets/lightlink-logo.png";
import { getTimestampForCurrenMonthFirstDay } from "../utils/firstDayTimestamp.js";
import Countdown from "react-countdown";
import Web3 from "web3";
import VAULTABI from "../../contracts/Vault.json";
import { VAULT_ADDRESS } from "../constant.js";
import { useEffect, useState } from "react";
import { getPrivateKey, getWallet } from "../utils/wallet.js";
import { toast } from "react-toastify";
import Frame6 from "../assets/Frame 6.png";

export const Vault = () => {
	const pieParams = { height: 200, margin: { right: 5 } };
	const web3 = new Web3("https://replicator-01.pegasus.lightlink.io/rpc/v1");
	const [total_bal, setTotal_bal] = useState(0);
	const [withdrawal_bal, setWithdrawal_bal] = useState(0);
	const [locked_bal, setLocked_bal] = useState(0);
	const [loading, setLoading] = useState(false);

	async function geyBalances() {
		const contract = new web3.eth.Contract(VAULTABI.abi, VAULT_ADDRESS);
		const from = await getWallet();

		// Precompute address
		const total_balance = await contract.methods
			.total_balance(from)
			.call({ from });
		setTotal_bal(total_balance);
		const withdrawal_balance = await contract.methods
			.withdrawal_balance(from)
			.call({ from });
		setWithdrawal_bal(withdrawal_balance);
		setLocked_bal(total_balance - withdrawal_balance);
		console.log(total_balance, withdrawal_balance, locked_bal);
	}

	async function withdraw() {
		setLoading(true);
		const PRIVATE_KEY = await getPrivateKey();
		const contract = new web3.eth.Contract(VAULTABI.abi, VAULT_ADDRESS);

		const transactionObject = contract.methods.withdraw().encodeABI();
		const from = await getWallet();
		const gasPrice = await web3.eth.getGasPrice();

		const nonce = await web3.eth.getTransactionCount(from);

		// Get gas
		const gas = await contract.methods.withdraw().estimateGas({ from });

		web3.eth.accounts
			.signTransaction(
				{
					from,
					to: VAULT_ADDRESS,
					gas,
					gasPrice,
					nonce,
					data: transactionObject,
				},
				PRIVATE_KEY
			)
			.then(async (s) => {
				web3.eth
					.sendSignedTransaction(s.rawTransaction)
					.on("receipt", (t) => {
						console.log(t.transactionHash);
						toast("Funds have been withdrawn", { type: "success" });
						setLoading(false);
						geyBalances();
					})
					.on("error", (error) => {
						setLoading(false);
						console.log(error.message);
					});
			})
			.catch((e) => {
				setLoading(false);
				console.log("errored", e);
			});
	}

	useEffect(() => {
		geyBalances();
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				// height: "100%",
				p: 2,
				background: `url('${Frame6}')`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<Box
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<Box>
					<small style={{ color: "grey", fontWeight: "500" }}>
						NEXT WITHDRAWAL IN
					</small>
					<br />
					<Countdown
						date={getTimestampForCurrenMonthFirstDay() * 1000}
						className="counter"
					/>
				</Box>
				<Stack direction="row" width="100%" textAlign="center" spacing={2}>
					<Box flexGrow={1} sx={{ position: "relative" }}>
						<PieChart
							series={[
								{
									data: [
										{
											value:
												withdrawal_bal === 0n && locked_bal === 0n
													? 1
													: Web3.utils.fromWei(withdrawal_bal, "ether"),
											color: "rgb(36 213 38)",
										},
										{
											value: Web3.utils.fromWei(locked_bal, "ether"),
											color: "#c7c7c7",
										},
									],
									innerRadius: 60,
									outerRadius: 80,
									paddingAngle: 5,
									cornerRadius: 5,
								},
							]}
							{...pieParams}
						/>
						<Box
							sx={{
								position: "absolute",
								right: 0,
								left: 0,
								top: "55px",
								bottom: "55px",
							}}
						>
							<img src={Lightlink_logo} alt="logo" height={"30px"} />
							<h2>{Web3.utils.fromWei(total_bal, "ether")}</h2>
							<p style={{ color: "grey" }}>Available</p>
						</Box>
					</Box>
				</Stack>
				<Box
					sx={{
						mt: 4,
						p: 2,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box>
						<small style={{ color: "grey", fontWeight: "500" }}>
							<span style={{ color: "rgb(36 213 38)" }}>●</span>&nbsp;Available
						</small>
						<h3>{Web3.utils.fromWei(withdrawal_bal, "ether")}</h3>
					</Box>
					<Divider style={{ width: "50%", transform: " rotate(90deg)" }} />
					<Box>
						<small style={{ color: "grey", fontWeight: "500" }}>
							●&nbsp;Locked
						</small>
						<h3>{Web3.utils.fromWei(locked_bal, "ether")}</h3>
					</Box>
				</Box>
			</Box>
			<Box sx={{ pb: 12, mt: 4 }}>
				<BlueButton title={"Withdraw"} onClick={withdraw} loading={loading} />
			</Box>
		</Box>
	);
};
