const metasender = {
	name: "Metasender",
	//change
	// Ethereum Networks
	address_0x1: "",
	address_0x5: "0x25604BB91DB2C95302cb0746eFeC239f394F252f",
	// binance Networks
	address_0x56: "",
	address_0x61: "0xDD979b3a607c6255e124B80E7C0cF1d5F2649Bd5",
	// polygon Networks
	address_0x89: "",
	address_0x13881: "0x8429B1975a180cbD4AbeefD27e0B669dD2179c00",
	// Avalanche Networks
	address_0xa86a: "",
	address_0xa869: "0x8429B1975a180cbD4AbeefD27e0B669dD2179c00",
	// fantom Networks
	address_0xfa: "",
	address_0xafa2: "0x4Ce6C8658e7cB676c24B212e0e60f9aa913f4ec4",
	abi: [
		"function PALCO( address _address ) public view returns( bool )",
		"function txFee() public view returns( uint256 )",
		"function PALCOPass() public view returns( uint256 )",
		"function addToPALCO( address _address) external payable",
		"function sendNativeTokenSameValue(address[] memory _to, uint256 _value) external payable",
		"function sendNativeTokenDifferentValue( address[] memory _to, uint256[] memory _value) external payable",
		"function sendIERC20SameValue( address _contractAddress, address[] memory _to, uint256 _value) payable external",
		"function sendIERC20DifferentValue( address _contractAddress, address[] memory _to, uint256[] memory _value) payable external",
		"function sendIERC721( address _contractAddress, address[] memory _to, uint256[] memory _tokenId) payable external",
	],
};

export default metasender;
