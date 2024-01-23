import { default as axios } from "axios";

export const getTransactionsByAccount = async function (add) {
	try {
		const response = await axios.get(
			`https://pegasus.lightlink.io/api?module=account&action=txlist&address=${add}&sort=desc`,
			{
				headers: {
					"Content-Type": `application/json`,
				},
			}
		);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};
