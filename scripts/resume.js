import { estimateTx } from "./estimate.js";
import { finalData } from "./finalData.js";
import ethChains from "./ethereumchains.js"
import { getContract, getTotalValue } from "./transactions.js";
export const ercABI = [
    'function balanceOf(address owner) view returns (uint balance)',
    'function symbol() public view returns (string)'
]

function roundNumber( num ) {
    return (Math.round(num * 1000)) / 1000
}

async function getUserBalance() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const bigNumBal = await provider.getBalance( ethereum.selectedAddress );

    const balance = Number(ethers.utils.formatEther(bigNumBal)) 

    return roundNumber( balance )

}

async function getUserTokenBalance( _address, tokenType ){

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract( _address, ercABI, provider )

    const inBalance = await contract.balanceOf( ethereum.selectedAddress );

    if ( tokenType == 'ERC721') return inBalance

    const balance = Number(ethers.utils.formatEther(inBalance)) 

    return roundNumber( balance )

}

async function getTokenSymbol(){

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract( finalData.tokenAddress, ercABI, provider )

    return await contract.symbol( ethereum.selectedAddress );

}

async function getTxCostAprox() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = getContract()

    const { gasEstimation } = await estimateTx()

    const txFee = await contract.txFee()

    const gasPrice = await provider.getGasPrice();

    const totalGas = gasPrice.mul(gasEstimation).add(txFee)

    return roundNumber(
        Number(ethers.utils.formatEther(totalGas))
    )

}

function getTotalToSend() {

    return Number(ethers.utils.formatEther(
            getTotalValue( finalData.amount )
        ))
    

}

export default async function setResumeInfo() {
    
    finalData.numAddresses = finalData.wallets.length

    finalData.tokenToSend == 'ERC721' ?
        finalData.totalToSend = finalData.amount.length :
        finalData.totalToSend = getTotalToSend()

    finalData.userETHBalance = await getUserBalance()

    finalData.txCost = await getTxCostAprox()

    finalData.NativeToken = ethChains[ ethereum.chainId.slice(2) ].symbol

    if( finalData.tokenToSend == 'ETH' ) {

        finalData.userTokenBalance = finalData.userETHBalance

        finalData.tokenSymbol = finalData.NativeToken

        finalData.totalCost = finalData.txCost + finalData.totalToSend

    } else  {

        finalData.userTokenBalance = await getUserTokenBalance(
            finalData.tokenAddress,
            finalData.tokenToSend
        )

        finalData.tokenSymbol = await getTokenSymbol()

        finalData.totalCost = finalData.txCost

     }

    // finalData.tokenToSend == 'ETH' ? 
    //     finalData.userTokenBalance = finalData.userETHBalance :
    //     finalData.userTokenBalance = await getUserTokenBalance(
    //         finalData.tokenAddress,
    //         finalData.tokenToSend
    //     )

    // finalData.tokenToSend == 'ETH' ? 
    //     finalData.tokenSymbol = finalData.NativeToken :
    //     finalData.tokenSymbol = await getTokenSymbol()

    return

}