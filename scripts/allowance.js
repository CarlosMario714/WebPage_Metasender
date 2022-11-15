import { finalData } from "./finalData.js"
import erc from './ercABI.js'
import { getContract, handleError, showErrorAlert } from "./tools.js"
import metasender from "./contracts/metasender.js"

finalData.tokenAddress = '0x26Cc6709e75BFd6C659220dAD12537Db719fA345'

export function handleAllowance( notAproved ) {

    showErrorAlert(`insuficent allowance`)

}

export async function getER20Aprove( amount ) {

    const contract = getContract( 
        finalData.tokenAddress,
        erc[20]
    )

    return await contract.approve(
        metasender[`address_${ ethereum.chainId }`],
        amount
    ).catch( handleError )

}

export async function getER721Aprove() {

    const contract = getContract( 
        finalData.tokenAddress,
        erc[721]
    )

    return await contract.setApprovalForAll(
        metasender[`address_${ ethereum.chainId }`],
        true
    ).catch( handleError )
    
}