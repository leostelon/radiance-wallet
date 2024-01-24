const { ethers } = require("ethers");

export async function createWallet(mnemonic) {
	const existingWallet = await getWallet();
	if (
		!existingWallet ||
		existingWallet === undefined ||
		existingWallet === ""
	) {
		// Create a wallet from the passphrase
		const wallet = ethers.Wallet.fromPhrase(mnemonic);

		chrome.storage.local.set(
			{ address: wallet.address, mnemonic },
			function () {
				// Display the wallet address
				console.log("Wallet Address:", wallet.address);
			}
		);
	}
}

export async function getWallet() {
	return new Promise((res, rej) => {
		chrome.storage.local.get(["address"], (response) => {
			if (!response.address) response.address = "";
			res(response.address);
		});
	});
}

export function createMnemonic() {
	return ethers.Wallet.createRandom().mnemonic.phrase;
}
