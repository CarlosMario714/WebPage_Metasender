import { estimateTx } from "./estimate.js";
import { finalData } from "./finalData.js";
import ethChains from "./ethereumchains.js"
import { getTotalValue } from "./transactions.js";
import erc from './ercABI.js'
import { getContract, getTokenSymbol, handleTxFee } from './tools.js';
export const ercABI = [
    'function balanceOf(address owner) view returns (uint balance)',
    'function symbol() public view returns (string)',
    'function allowance(address owner, address spender) external view returns (uint256)',
]
const totalWallets = document.querySelector(".total-wallets");
const totalTokens = document.querySelectorAll(".total-tokens");
const balanceTokens = document.querySelector(".balance-tokens");
const balanceEth = document.querySelector(".balance-eth");
const costoOperacion = document.querySelector(".costo-operacion");
const costoTotalOperacion = document.querySelector(".costo-operacion-total");
const loaderSendProcess = document.querySelector(".loader-send-process");
const manualDataContainer = document.querySelector(".manual-data-container");
const resumenFinalContainer = document.querySelector(
    ".resumen-final-container"
);
const blockExplorerLinkItem = document.querySelector(".blockExplorerLink");


function roundNumber( num ) {

    return (Math.round(num * 1000000)) / 1000000

}

export async function getDecimals() {

    const contract = getContract(
        finalData.tokenAddress, 
        erc[20]
    )

    return await contract.decimals()

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

    const balance = Number(ethers.utils.formatUnits(inBalance, finalData.decimals)) 

    return roundNumber( balance )

}

async function getTxCostAprox() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const { gasEstimation } = await estimateTx()

    const txFee = await handleTxFee()

    const gasPrice = await provider.getGasPrice();

    const totalGas = gasPrice.mul(gasEstimation).add(txFee)

    return roundNumber(
        Number(ethers.utils.formatEther(totalGas))
    )

}

function getTotalToSend() {

    return Number(ethers.utils.formatUnits(
            getTotalValue( finalData.amount ), finalData.decimals
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

        finalData.tokenSymbol = await getTokenSymbol( finalData.tokenAddress )

        finalData.totalCost = finalData.txCost

     }

    return

}

async function setFinalResume() {

  return await setResumeInfo().then(() => {

    totalWallets.innerHTML = finalData.numAddresses;

    totalTokens[0].innerHTML = `${finalData.totalToSend} ${finalData.tokenSymbol}`;

    totalTokens[1].innerHTML = `${finalData.totalToSend} ${finalData.tokenSymbol}`;

    balanceTokens.innerHTML = `${finalData.userTokenBalance} ${finalData.tokenSymbol}`;

    balanceEth.innerHTML = `${finalData.userETHBalance} ${finalData.NativeToken}`;

    costoOperacion.innerHTML = `${finalData.txCost} ${finalData.NativeToken}`;

    costoTotalOperacion.innerHTML = `${finalData.totalCost} ${finalData.NativeToken}`;

  });
  
}

export async function setDataAndShowResume() {

  loaderSendProcess.classList.toggle("show-loader-send-process");

  await setFinalResume();

  loaderSendProcess.classList.toggle("show-loader-send-process");

  manualDataContainer.style.display = "none";

  resumenFinalContainer.style.display = "flex";

  blockExplorerLinkItem.style.opacity = 0;

}