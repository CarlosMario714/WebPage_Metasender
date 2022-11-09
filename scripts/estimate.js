import metasender from "./contracts/metasender.js";
import { finalData  } from "./finalData.js";
const btnSend = document.querySelector('.btnSend')
const ERC20Address = "0x26Cc6709e75BFd6C659220dAD12537Db719fA345"
const ERC721Address = "0x38105D76bca204cEa0A38B7A52D24620AAb6DA60"
const tokenIds = [12, 17, 18]

function getTotalValue(valuesArray) {

	return valuesArray.reduce((prev, curr) => prev.add(curr));

}

function isSameValue( values ) {

	const isSame = values.every(( prev, curr) => prev == curr)

	if ( isSame ) return 'Same'

	return 'Different'

}

function getContract() {
	
	const provider = new ethers.providers.Web3Provider(window.ethereum);

	const signer = provider.getSigner();

	return new ethers.Contract(
		metasender[`address_${ ethereum.chainId }`],
		metasender.abi,
		signer
	);
	
}

async function sendNativeTokenSameValue( addresses, amounts ) {

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract.estimateGas
		.sendNativeTokenSameValue( addresses, amounts, 
			{ value: getTotalValue( amounts ).add(txFee) }
		)
		.catch((err) => console.log(err));
	
	
}

async function sendNativeTokenDifferentValue( addresses, amounts ) {

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract.estimateGas
		.sendNativeTokenDifferentValue(addresses, amounts, 
			{ value: getTotalValue( amounts ).add(txFee) }
		)
		.catch((err) => console.log(err));
	
}

async function sendIERC20SameValue( contactAdd, addresses, amounts ) {

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract.estimateGas
		.sendIERC20SameValue( contactAdd, addresses, amounts, 
			{ value: txFee }
		)
		.catch((err) => console.log(err));
	
}

async function sendIERC20DifferentValue( contactAdd, addresses, amounts ) {

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract.estimateGas
		.sendIERC20DifferentValue( contactAdd, addresses, amounts,  
			{ value: txFee }
		)
		.catch((err) => console.log(err));
	
}

async function sendIERC721( contactAdd, addresses, tokenIds) {

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract.estimateGas
		.sendIERC721( contactAdd, addresses, tokenIds,  
			{ value: txFee }
		)
		.catch((err) => console.log(err));

}

async function addToPALCO( _address ){

	 const contract = getContract()

	 const PAlCOFee = await contract.PAlCOFee()

	 return await contract.estimateGas.addPALCO(
		_address, { value: PAlCOFee }
	 )

}

class MetasenderMethods {

	constructor() {

		this.sendNativeTokenDifferentValue = sendNativeTokenDifferentValue
		this.sendNativeTokenSameValue = sendNativeTokenSameValue
		this.sendIERC20DifferentValue = sendIERC20DifferentValue
		this.sendIERC20SameValue = sendIERC20SameValue
		this.sendIERC721 = sendIERC721
		this.addPALCO = addToPALCO

	}

}

export const mSestimateFunc = new MetasenderMethods()

export async function estimateTx( tokenType, contAdd ) {

	let gasEstimation

	switch( tokenType ){

		case 'ETH':
			gasEstimation = await mSestimateFunc[
				`sendNativeToken${ isSameValue( finalData.amount ) }Value`
			]( finalData.wallets, finalData.amount )
			break

		case 'ERC20':
			gasEstimation = await mSestimateFunc[
				`sendIERC20${ isSameValue( finalData.amount ) }Value`
			]( contAdd, finalData.wallets, finalData.amount );
			break

		case 'ERC721':
			gasEstimation = await mSestimateFunc.sendIERC721( 
				contAdd, 
				finalData.wallets, 
				tokenIds
			);
			break

	}

	if ( gasEstimation ) return { verify: true, gasEstimation }
	
	else return { verify: false }

}
