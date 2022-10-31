import metasender from "./contracts/metasender.js";

function getTotalValue(valuesArray) {

	return valuesArray.reduce((prev, curr) => prev.add(curr));

}

function isSameValue( values ) {

	return values.every(( prev, curr) => prev == curr)

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

async function sendEthSameValue( addresses, amounts ) {

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract
		.sendEthSameValue(addresses, amounts, 
			{ value: getTotalValue(addresses).add(txFee) })
		.catch((error) => console.log(error.error.message));
	
	
}

async function sendEthDifferentValue( addresses, amounts ) {

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract
		.sendEthDifferentValue(addresses, amounts, 
			{ value: getTotalValue(addresses).add(txFee) })
		.catch((error) => console.log(error.error.message));
	
	
}

async function sendIERC20SameValue( addresses, amounts ) {

	const contract = getContract()

	const txFee = await contract.txFee();

	const tx = await contract
		.sendIERC20SameValue(addresses, amounts, 
			{ value: getTotalValue(addresses).add(txFee) })
		.catch((error) => console.log(error.error.message));
	
}

async function sendIERC20DifferentValue( addresses, amounts ) {

	const contract = getContract()

	const txFee = await contract.txFee();

	const tx = await contract
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

async function handleSendETH( addresses, amounts ) {

	if( isSameValue( amounts )) await sendEthSameValue( addresses, amounts)

	else await sendEthDifferentValue( addresses, amounts)

	return

}

async function handleSendERC20( addresses, amounts ) {

	if( isSameValue( amounts )) await sendIERC20SameValue( addresses, amounts)

	else await sendIERC20DifferentValue( addresses, amounts)

	return

}

export async function sendTransaction(addresses, amounts, tokenType) {

	switch(tokenType){

		case 'ETH':
			return await handleSendETH( addresses, amounts );

		case 'ERC20':
			return await handleSendERC20( addresses, amounts );

		case 'ERC721':
			return await sendIERC721(addresses, amounts);

	}

}
