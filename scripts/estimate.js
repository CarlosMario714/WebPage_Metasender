import {  getTotalValue, isSameValue } from "./transactions.js";
import { getContract, handleError  } from "./tools.js";
import metasender from "./contracts/metasender.js";
import { finalData  } from "./finalData.js";

async function sendNativeTokenSameValue( addresses, amounts ) {

	const contract = getContract( 
		metasender[`address_${ ethereum.chainId }`], 
		metasender.abi
	)

	const txFee = await contract.txFee();

	return await contract.estimateGas
		.sendNativeTokenSameValue( addresses, amounts[0], 
			{ value: getTotalValue( amounts ).add(txFee) }
		)
		.catch( handleError );
	
}

async function sendNativeTokenDifferentValue( addresses, amounts ) {

	const contract = getContract( 
		metasender[`address_${ ethereum.chainId }`], 
		metasender.abi
	)

	const txFee = await contract.txFee();

	return await contract.estimateGas
		.sendNativeTokenDifferentValue(addresses, amounts, 
			{ value: getTotalValue( amounts ).add(txFee) }
		)
		.catch( handleError );
	
}

async function sendIERC20SameValue( contactAdd, addresses, amounts ) {

	const contract = getContract( 
		metasender[`address_${ ethereum.chainId }`], 
		metasender.abi
	)

	const txFee = await contract.txFee();

	return await contract.estimateGas
		.sendIERC20SameValue( contactAdd, addresses, amounts[0], 
			{ value: txFee }
		)
		.catch( handleError );
	
}

async function sendIERC20DifferentValue( contactAdd, addresses, amounts ) {

	const contract = getContract( 
		metasender[`address_${ ethereum.chainId }`], 
		metasender.abi
	)

	const txFee = await contract.txFee();

	return await contract.estimateGas
		.sendIERC20DifferentValue( contactAdd, addresses, amounts,
			{ value: txFee }
		)
		.catch( handleError );
	
}

async function sendIERC721( contactAdd, addresses, tokenIds ) {

	console.log( contactAdd, addresses, tokenIds )

	const contract = getContract( 
		metasender[`address_${ ethereum.chainId }`], 
		metasender.abi
	)

	const txFee = await contract.txFee();

	return await contract.estimateGas
		.sendIERC721( contactAdd, addresses, tokenIds,  
			{ value: txFee }
		)
		.catch( handleError );

}

class MetasenderMethods {

	constructor() {

		this.sendNativeTokenDifferentValue = sendNativeTokenDifferentValue
		this.sendNativeTokenSameValue = sendNativeTokenSameValue
		this.sendIERC20DifferentValue = sendIERC20DifferentValue
		this.sendIERC20SameValue = sendIERC20SameValue
		this.sendIERC721 = sendIERC721

	}

}

export const mSestimateFunc = new MetasenderMethods()

export async function estimateTx() {

	let gasEstimation

	switch( finalData.tokenToSend ){

		case 'ETH':
			gasEstimation = await mSestimateFunc[
				`sendNativeToken${ isSameValue( finalData.amount ) }Value`
			]( finalData.wallets, finalData.amount )
			break

		case 'ERC20':
			gasEstimation = await mSestimateFunc[
				`sendIERC20${ isSameValue( finalData.amount ) }Value`
			]( finalData.tokenAddress, finalData.wallets, finalData.amount );
			break

		case 'ERC721':
			gasEstimation = await mSestimateFunc.sendIERC721( 
				finalData.tokenAddress,
				finalData.wallets, 
				finalData.amount
			);
			break

	}

	if ( gasEstimation ) return { verify: true, gasEstimation }
	
	else return { verify: false }

}

// console.log(sendIERC20DifferentValue(
// 	"0x26Cc6709e75BFd6C659220dAD12537Db719fA345",
// 	["0x4057171680FA6f9A9E65707076c1b18eE078eBbA"],
// 	[ethers.utils.parseEther('1')]
// ))