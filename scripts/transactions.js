import metasender from "./contracts/metasender.js";
import { finalData  } from "./finalData.js";
import ethChains from "./ethereumchains.js"
import { handleError  } from "./tools.js";
const blockExplorerLinkItem = document.querySelector('.blockExplorerLink')
const btnSend = document.querySelector('.send-btn')
const btnPalco = document.querySelector('.btn-palco')
const ERC20Address = "0x26Cc6709e75BFd6C659220dAD12537Db719fA345"
const ERC721Address = "0x38105D76bca204cEa0A38B7A52D24620AAb6DA60"
const tokenIds = [12, 17, 18]

export function getTotalValue(valuesArray) {

	return valuesArray.reduce((prev, curr) => prev.add(curr));

}

export function isSameValue( values ) {

	const isSame = values.every(( prev, curr) => prev == curr)

	if ( isSame ) return 'Same'

	return 'Different'

}

export function getContract() {
	
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

	return await contract
		.sendNativeTokenSameValue( addresses, amounts[0], 
			{ value: getTotalValue( amounts ).add(txFee) }
		)
		.catch( handleError );
	
	
}

async function sendNativeTokenDifferentValue( addresses, amounts ) {

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract
		.sendNativeTokenDifferentValue(addresses, amounts, 
			{ value: getTotalValue( amounts ).add(txFee) }
		)
		.catch( handleError );
	
	
}

async function sendIERC20SameValue( contactAdd, addresses, amounts ) {

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract
		.sendIERC20SameValue( contactAdd, addresses, amounts[0], 
			{ value: txFee }
		)
		.catch( handleError );
	
}

async function sendIERC20DifferentValue( contactAdd, addresses, amounts ) {

	console.log( contactAdd, addresses, amounts )

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract
		.sendIERC20DifferentValue( contactAdd, addresses, amounts,  
			{ value: txFee }
		)
		.catch( handleError );
	
}

async function sendIERC721( contactAdd, addresses, tokenIds) {

	const contract = getContract()

	const txFee = await contract.txFee();

	return await contract
		.sendIERC721( contactAdd, addresses, tokenIds,  
			{ value: txFee }
		)
		.catch((err) => console.log(err));

}

export async function addToPALCO(){

	 const contract = getContract()

	 const PALCOFee = await contract.PALCOPass()

	 return await contract.addToPALCO(
		ethereum.selectedAddress, { value: PALCOFee }
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

const mSFunc = new MetasenderMethods()

export async function sendTransaction() {

	switch( finalData.tokenToSend ){

		case 'ETH':
			return await mSFunc[
				`sendNativeTokenDifferentValue`
			]( finalData.wallets, finalData.amount );

		case 'ERC20':
			return await mSFunc[
				`sendIERC20${ isSameValue( finalData.amount ) }Value`
			]( finalData.tokenAddress, finalData.wallets, finalData.amount );

		case 'ERC721':
			return await mSFunc.sendIERC721( 
				finalData.tokenAddress, 
				finalData.wallets, 
				tokenIds
			);

	}

}

btnSend.addEventListener("click", async(e) => {

    await sendTransaction().then(( tx ) => {

		const chainId = ethereum.chainId.slice(2)
	
		blockExplorerLinkItem.href = `${ethChains[ chainId ].blockExplorer}/tx/${tx.hash}`
	
		blockExplorerLinkItem.style.opacity = 1

	})

})

btnPalco.onclick = mSFunc.addPALCO