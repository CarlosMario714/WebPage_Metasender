import metasender from "./contracts/metasender.js";
const btnSend = document.getElementById("send");
const addressExample = [
	"0xf45025599c54930BF6C16C208f0507E80FEA5d84",
	"0x43875B7D7cE9Aaea95375929405fE05c84192C1E",
];
const valuesEj = [
	ethers.utils.parseEther("0.01"),
	ethers.utils.parseEther("0.01"),
];

function getTotalValue(valuesArray) {
	return valuesArray.reduce((prev, curr) => prev.add(curr));
}

async function listenContract() {
	const provider = ethers.getDefaultProvider(5);

	const contract = new ethers.Contract(
		metasender.address,
		metasender.abi,
		provider
	);

	const ifece = new ethers.utils.Interface(metasender.abi);

	const tx = await provider.getTransaction(
		"0xd39ac1fed3c45d572d72f4f10a6d9610bb23ccd676b06ff24113e3252adddde0"
	);

	console.log(tx);

	const decode = ifece.parseTransaction({
		data: tx.data,
		value: tx.value,
	});

	console.log(decode);
}

async function sendEthDifferentValue() {
	const provider = new ethers.providers.Web3Provider(window.ethereum);

	const signer = provider.getSigner();

	const contract = new ethers.Contract(
		metasender.address,
		metasender.abi,
		signer
	);

	const txFee = await contract.txFee();

    const ifece = new ethers.utils.Interface(metasender.abi);

	await contract
		.sendEthDifferentValue(addressExample, valuesEj, {
			value: getTotalValue(valuesEj).add(txFee),
		})
		.then((tx) => {

            console.log(tx.hash)

			const decode = ifece.parseTransaction({
				data: tx.data,
				value: tx.value,
			});

			console.log(decode);

		})
		.catch((error) => console.log(error.error.message));
}

listenContract()

btnSend.onclick = sendEthDifferentValue;
