export function formatTimestampToHumanReadable(timestamp) {
	const date = new Date(timestamp);

	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");

	const formattedTime = `${year}-${month}-${day} ${date.toLocaleTimeString()}`;

	return formattedTime;
}
