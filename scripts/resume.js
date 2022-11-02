// import { estimateTx } from "./estimate.js";
// import { finalData } from "./finalData.js";
const ercABI = [
    'function balanceOf(address owner) view returns (uint balance)'
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

async function getTxCostAprox() {

    const { gasEstimation } = await estimateTx( 
        finalData.tokenToSend,
        finalData.tokenAddress
    )

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const gasPrice = await provider.getGasPrice();

    const totalGas = gasPrice * gasEstimation
}