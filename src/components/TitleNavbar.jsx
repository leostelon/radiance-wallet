import { Box } from "@mui/material";

export function TitleNavbar() {
	return (
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
	);
}
