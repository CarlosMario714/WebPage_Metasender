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
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "LogNativeTokenBulkTransfer",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "contractAddress",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "LogTokenBulkTransfer",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "newPALCOMember",
					"type": "address"
				}
			],
			"name": "NewPALCOMember",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "addressToRemove",
					"type": "address"
				}
			],
			"name": "RemoveToPALCO",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "newPALCOPass",
					"type": "uint256"
				}
			],
			"name": "SetPALCOPass",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "newTxFee",
					"type": "uint256"
				}
			],
			"name": "SetTxFee",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "contractAddress",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "WithDrawIRC20",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "WithdrawTxFee",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "PALCO",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "PALCOPass",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "addToPALCO",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "removeToPALCO",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "renounceOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_contractAddress",
					"type": "address"
				},
				{
					"internalType": "address[]",
					"name": "_to",
					"type": "address[]"
				},
				{
					"internalType": "uint256[]",
					"name": "_value",
					"type": "uint256[]"
				}
			],
			"name": "sendIERC20DifferentValue",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_contractAddress",
					"type": "address"
				},
				{
					"internalType": "address[]",
					"name": "_to",
					"type": "address[]"
				},
				{
					"internalType": "uint256",
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "sendIERC20SameValue",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_contractAddress",
					"type": "address"
				},
				{
					"internalType": "address[]",
					"name": "_to",
					"type": "address[]"
				},
				{
					"internalType": "uint256[]",
					"name": "_tokenId",
					"type": "uint256[]"
				}
			],
			"name": "sendIERC721",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address[]",
					"name": "_to",
					"type": "address[]"
				},
				{
					"internalType": "uint256[]",
					"name": "_value",
					"type": "uint256[]"
				}
			],
			"name": "sendNativeTokenDifferentValue",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address[]",
					"name": "_to",
					"type": "address[]"
				},
				{
					"internalType": "uint256",
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "sendNativeTokenSameValue",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_newPALCOPass",
					"type": "uint256"
				}
			],
			"name": "setPALCOPass",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_newTxFee",
					"type": "uint256"
				}
			],
			"name": "setTxFee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "txFee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "withDrawIRC20",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "withdrawTxFee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	],
};

export default metasender;
