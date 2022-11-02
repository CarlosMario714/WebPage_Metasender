const ercABI = ['balanceOf(address owner)']

async function getUserBalance() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const balance = await provider.getBalance( ethereum.selectedAddress );

    return ethers.utils.formatEther(balance)

}

async function getUserTokenBalance( _address ){

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract( _address, ercABI, provider )

    const balance = await contract.balanceOf( ethereum.selectedAddress );

    return ethers.utils.formatEther(balance)

}