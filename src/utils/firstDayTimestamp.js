export function getTimestampForCurrenMonthFirstDay() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth();
	const firstDayOfMonth = new Date(year, month, 1);
	const timestamp = firstDayOfMonth.getTime(); // Get timestamp in milliseconds
	return timestamp / 1000;
}
