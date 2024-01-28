import { Box, Divider, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BlueButton } from "../components/BlueButton.jsx";
import styled from "@emotion/styled";
import { useDrawingArea } from "@mui/x-charts";
import Lightlink_logo from "../assets/lightlink-logo.png";

export const Vault = () => {
	const pieParams = { height: 200, margin: { right: 5 } };
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				p: 2,
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
					<p style={{ color: "grey", fontWeight: "bold", color: "black" }}>
						23D 12:30:48
					</p>
				</Box>
				<Stack direction="row" width="100%" textAlign="center" spacing={2}>
					<Box flexGrow={1} sx={{ position: "relative" }}>
						<PieChart
							series={[
								{
									data: [
										{ value: 20, color: "rgb(36 213 38)" },
										{ value: 10, color: "#c7c7c7" },
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
							<img src={Lightlink_logo} alt="logo" height={"35px"} />
							<h2>158</h2>
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
							●&nbsp;Available
						</small>
						<h3>78.00</h3>
					</Box>
					<Divider style={{ width: "50%", transform: " rotate(90deg)" }} />
					<Box>
						<small style={{ color: "grey", fontWeight: "500" }}>
							●&nbsp;Locked
						</small>
						<h3>12.00</h3>
					</Box>
				</Box>
			</Box>
			<Box sx={{ pb: 12 }}>
				<BlueButton title={"Withdraw"} />
			</Box>
		</Box>
	);
};

const StyledText = styled("text")(({ theme }) => ({
	// fill: theme.palette.text.primary,
	textAnchor: "middle",
	dominantBaseline: "central",
	whiteSpace: "pre-line",
}));

function PieCenterLabel({ children }) {
	const { width, height, left, top } = useDrawingArea();
	return (
		<StyledText x={left + width / 2} y={top + height / 2}>
			{children}
		</StyledText>
	);
}
