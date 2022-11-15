import { finalData } from "./finalData.js"
import erc from './ercABI.js'
import { showErrorAlert } from "./tools.js"

export function handleAllowance( notAproved ) {

    showErrorAlert(`insuficent allowance`)

}

export function getER20Aprove( amount ) {

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract( finalData.tokenAddress, erc[721], provider )
}