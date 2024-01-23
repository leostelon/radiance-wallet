const { ethers } = require("ethers");

export async function createWallet() {
	const existingWallet = await getWallet();
	if (existingWallet || existingWallet !== undefined || existingWallet !== "")
		return;

	// Replace 'your_passphrase' with your actual passphrase
	const mnemonic = createMnemonic();

	// Create a wallet from the passphrase
	const wallet = ethers.Wallet.fromPhrase(mnemonic);

	chrome.storage.local.get(["address"], function (res) {
		if (!res.address) res.address = "no address";
		setAddress(res.address);
	});

	// Display the wallet address
	console.log("Wallet Address:", wallet.address);
}

export async function getWallet() {
	return new Promise((res, rej) => {
		chrome.storage.local.get(["address"], (response) => {
			if (!res.address) res.address = "";
			res(res.address);
		});
	});
}

export function createMnemonic() {
	return ethers.Wallet.createRandom().mnemonic.phrase;
}
