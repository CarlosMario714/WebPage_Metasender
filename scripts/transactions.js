import metasender from "./contracts/metasender.js";

function getTotalValue(valuesArray) {
	return valuesArray.reduce((prev, curr) => prev.add(curr));
}

function getContract() {
	
	const provider = new ethers.providers.Web3Provider(window.ethereum);

	const signer = provider.getSigner();

	return new ethers.Contract(
		metasender.address,
		metasender.abi,
		signer
	);
	
}

async function listenContract() {
	const provider = ethers.getDefaultProvider(5);

	const contract = new ethers.Contract(
		metasender.address,
		metasender.abi,
		provider
	);

	const ifece = new ethers.utils.Interface(metasender.abi);

	const tx = await provider.getTransaction(
		"0xd39ac1fed3c45d572d72f4f10a6d9610bb23ccd676b06ff24113e3252adddde0"
	);

	console.log(tx);

	const decode = ifece.parseTransaction({
		data: tx.data,
		value: tx.value,
	});

	console.log(decode);
}

async function sendEthDifferentValue( addresses, amounts ) {

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract
		.sendEthDifferentValue(addresses, amounts, 
			{ value: getTotalValue(addresses).add(txFee) })
		.catch((error) => console.log(error.error.message));
	
	
}

async function sendIERC20DifferentValue( addresses, amounts ) {

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract
		.sendIERC20DifferentValue(addresses, amounts, 
			{ value: getTotalValue(addresses).add(txFee) })
		.catch((error) => console.log(error.error.message));
	
}

async function sendIERC721( addresses, tokenIds) {

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract
		.sendIERC721(addresses, tokenIds, 
			{ value: getTotalValue(addresses).add(txFee) })
		.catch((error) => console.log(error.error.message));

}

export async function sendTransaction(addresses, amounts, tokenType) {

	switch(tokenType){

		case 'ETH':
			return await sendEthDifferentValue( addresses, amounts );

		case 'ERC20':
			return await sendIERC20DifferentValue( addresses, amounts );

		case 'ERC721':
			return await sendIERC721(addresses, amounts);

	}

}
