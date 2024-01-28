import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BlueButton } from "../components/BlueButton.jsx";

export const Vault = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
			}}
		>
			<Box
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Box>
					<h2>Next withdrawal</h2>
					<p>23 Days, 12:30:48 hrs</p>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignContent: "center",
					}}
				>
					<Box sx={{ position: "absolute", left: 0 }}>
						<PieChart
							series={[
								{
									data: [
										{
											id: 0,
											value: 10,
											label: "Withdrawable Balance",
											color: "#FFB878",
										},
										{
											id: 1,
											value: 15,
											label: "Available Balance",
											color: "#5455FF",
										},
									],
									innerRadius: 55,
									outerRadius: 70,
								},
							]}
							width={450}
							height={200}
							slotProps={{
								legend: { hidden: true },
							}}
						/>
					</Box>
				</Box>
			</Box>
			<Box sx={{ p: 2, pb: 12 }}>
				<BlueButton title={"Withdraw"} />
			</Box>
		</Box>
	);
};
