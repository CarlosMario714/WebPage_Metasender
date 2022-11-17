import { finalData } from "./finalData.js"
import erc from './ercABI.js'
import { getContract, getTokenSymbol, handleError, showErrorAlert } from "./tools.js"
import metasender from "./contracts/metasender.js"
import ethereumchains from "./ethereumchains.js";
import { getTotalValue } from "./transactions.js";
const aproveErc20Container = document.querySelector(".aprove-erc20-container");
const totalToAprove = document.querySelector('.total-to-Aprove')
const blockExprorerAprove = document.querySelector('.blockExprorerAprove')
const tokenInput = document.getElementById("token-input");

async function isApprovedForAll() {

    const contract = getContract(finalData.tokenAddress, erc[721])

    return await contract.isApprovedForAll( 
        ethereum.selectedAddress,
        metasender[`address_${ ethereum.chainId }`]
    )

}

async function getApproved( tokenId, metasenderAdd ) {

    const contract = getContract(finalData.tokenAddress, erc[721])

    const aprovAddres = await contract.getApproved( tokenId )

    return aprovAddres == metasenderAdd
}

async function getERC721Approved( tokenIds ) {

    const metasenderAdd = metasender[`address_${ ethereum.chainId }`]

    const aproved = {}

    for ( const tokenId of tokenIds ) 

        aproved[tokenId] = await getApproved( tokenId, metasenderAdd )

    return aproved

}

async function setERC721Aproved( tokenIds ) {

    const aproved = await getERC721Approved( tokenIds )

    const notAproved = []

    for( const tokenId of tokenIds ) 

        if ( !aproved[ tokenId ] ) notAproved.push( tokenId )

    finalData.tokensToAprove = notAproved.length

    return { isAproved: notAproved.length == 0, notAproved: notAproved.length }
    
}

export async function isERC721Aproved( tokenIds ) {

    const isAproved = await isApprovedForAll()

    if ( isAproved ) return { isAproved }

    return await setERC721Aproved( tokenIds )

}

export async function isAproved( amounts ) {

    const needAmount = Number(ethers.utils.formatEther(amounts))

    const contract = getContract(finalData.tokenAddress, erc[20])

    const tokensAproved = await contract.allowance( 
        ethereum.selectedAddress, 
        metasender[`address_${ ethereum.chainId }`]
    )

    const aprove = Number(ethers.utils.formatEther(tokensAproved))

    finalData.tokensToAprove = needAmount

    return { notAproved: needAmount - aprove, isAproved: aprove >= needAmount}

}

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
        .then(() => 
    
            aproveErc20Container.classList.toggle("show-aprove-erc20-container")
    
        ).catch( handleError )

}

async function getER20Aprove() {

    const contract = getContract( 
        finalData.tokenAddress,
        erc[20]
    )

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

export async function isTokenAproved(amounts) {

  if (tokenInput.value == "ERC20")
    return await isAproved(getTotalValue(amounts));

  if (tokenInput.value == "ERC721")
    return await isERC721Aproved( amounts );

  else return { isAproved: true }
  
}

export async function handleAproval() {

    if( finalData.tokenToSend == "ERC20")
        return await getER20Aprove()
            .then( handleAproveTx )
            .catch( handleError )

    if( finalData.tokenToSend == "ERC721")
        return await getER721Aprove()
            .then( handleAproveTx )
            .catch( handleError )

}