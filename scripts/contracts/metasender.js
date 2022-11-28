const metasender = {
	name: "Metasender",
	//change
	// Ethereum Networks
	address_0x1: "0xE9ced91b72F71d02c14e1de998662Ec9bF8273aE",
	address_0x5: "0x80d58dd4083936f43e92F359Db90f94B12303971",
	// binance Networks
	address_0x38: "0x80d58dd4083936f43e92f359db90f94b12303971",
	address_0x61: "0x80d58dd4083936f43e92f359db90f94b12303971",
	// polygon Networks
	address_0x89: "0x80d58dd4083936f43e92f359db90f94b12303971",
	address_0x13881: "0x80d58dd4083936f43e92f359db90f94b12303971",
	// Avalanche Networks
	address_0xa86a: "0x80d58dd4083936f43e92f359db90f94b12303971",
	address_0xa869: "0x80d58dd4083936f43e92f359db90f94b12303971",
	// fantom Networks
	address_0xfa: "0x80d58dd4083936f43e92f359db90f94b12303971",
	address_0xfa2: "0x80d58dd4083936f43e92f359db90f94b12303971",
	abi: [
		"function PALCO( address _address ) public view returns( bool )",
		"function txFee() public view returns( uint256 )",
		"function PALCOPass() public view returns( uint256 )",
		"function addToPALCO( address _address) external payable",
		"function sendNativeTokenSameValue(address[] memory _to, uint256 _value) external payable",
		"function sendNativeTokenDifferentValue( address[] memory _to, uint256[] memory _value) external payable",
		"function sendERC20SameValue( address _contractAddress, address[] memory _to, uint256 _value) payable external",
		"function sendERC20DifferentValue( address _contractAddress, address[] memory _to, uint256[] memory _value) payable external",
		"function sendERC721( address _contractAddress, address[] memory _to, uint256[] memory _tokenId) payable external",
	],
};

export default metasender;
