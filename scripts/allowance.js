import { finalData } from "./finalData.js"
import erc from './ercABI.js'
import { getContract, getTokenSymbol, handleError, showErrorAlert } from "./tools.js"
import metasender from "./contracts/metasender.js"
import ethereumchains from "./ethereumchains.js";
const aproveErc20Container = document.querySelector(".aprove-erc20-container");
const btnAprove = document.querySelector('.btn-aprove')
const totalToAprove = document.querySelector('.total-to-Aprove')
const blockExprorerAprove = document.querySelector('.blockExprorerAprove')

export async function handleAllowance() {
  
    aproveErc20Container.classList.toggle("show-aprove-erc20-container");

    const symbol = await getTokenSymbol( finalData.tokenAddress )

    totalToAprove.innerHTML = `${ finalData.tokensToAprove } ${ symbol }`

}

async function handleAproveTx( tx ) {

    const blockExplorer = ethereumchains[ ethereum.chainId.slice(2) ].blockExplorer

    blockExprorerAprove.style.display = 'block'

    blockExprorerAprove.href = `${ blockExplorer }/tx/${ tx.hash }`

    showErrorAlert('Wait to transaction confirmation')

    await tx.wait()

    aproveErc20Container.classList.toggle("show-aprove-erc20-container");

}

async function getER20Aprove() {

    const contract = getContract( 
        finalData.tokenAddress,
        erc[20]
    )

    console.log(finalData.tokensToAprove)

    const amount = ethers.utils.parseEther(`${finalData.tokensToAprove}`)

    return await contract.approve(
        metasender[`address_${ ethereum.chainId }`],
        amount
    ).catch( handleError )

}

async function getER721Aprove() {

    const contract = getContract( 
        finalData.tokenAddress,
        erc[721]
    )

    return await contract.setApprovalForAll(
        metasender[`address_${ ethereum.chainId }`],
        true
    )
    .catch( handleError )
    
}

async function handleAproval() {

    if( finalData.tokenToSend == "ERC20")
        return await getER20Aprove()
            .then( handleAproveTx )
            .catch( handleError )

    if( finalData.tokenToSend == "ERC721")
        return await getER721Aprove()
            .then( handleAproveTx )
            .catch( handleError )

}

btnAprove.onclick = handleAproval