import { ercABI } from "./resume.js"

export function removeClass( items, className ){

    for( const item of items )
        item.classList.remove( className )

}

export function addClass( items, className ){

    for( const item of items )
        item.classList.add( className )

}

export async function getTokenSymbol( _address ) {

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract( _address, ercABI, provider )

    return await contract.symbol();

}