// const closeAlert = document.querySelectorAll(".closeAlert");
// const alertText = document.querySelector(".alert-text");
const btnConnect = document.getElementById("btn-connect");
const chainSelect = document.getElementById("eth-network-select");
// const installAlert = document.querySelector(".installAlert");
// const connectedToMainet = document.querySelector(".connectedToMainet");
// const disConnectedToMainet = document.querySelector(".disConnectedToMainet");
// const errorAlert = document.querySelector(".errorsAlert");
// const inputWalletForm = document.querySelector(
// 	'.contact-form input[name="wallet"] '
//change
const chain = "0x1";
let isConnected = false;

// Connect with a ethereum account ( only compatible with metamask )

function setWalletAddress() {
	let start = ethereum.selectedAddress.match(/^\w{5}/);
	let end = ethereum.selectedAddress.match(/\w{4}$/);
	return start + "..." + end;
}

async function connectWallet() {
	await window.ethereum
		.request({
			method: "wallet_requestPermissions",
			params: [{ eth_accounts: {} }],
		})
		.then(() => {
			btnConnect.innerHTML = setWalletAddress();
		})
		.catch((x) => {
			console.log(x.message);
		});
}

// it change the chain to Ethereum main net

async function changeChain(chain) {
	return await window.ethereum.request({
		//change
		id: Number(chain),
		jsonrpc: "2.0",
		method: "wallet_switchEthereumChain",
		params: [
			{
				chainId: "0x" + chain,
			},
		],
	});
}

function setChain(e) {
	changeChain(e.target.value);
}

// calls connectWallet() and changeChain()

async function login() {
	if (window.ethereum) {
		connectWallet();

		changeChain(5);
	} else {
		installAlert.classList.add("showAlert");
	}
}

// set function to the buttons

btnConnect.addEventListener("click", () => {
	if (!isConnected) {
		login();
	}
});

chainSelect.onclick = setChain;

//close alerts

// closeAlert.forEach((alert) => {
// 	alert.addEventListener("click", function () {
// 		connectedToMainet.classList.remove("showAlert");
// 		disConnectedToMainet.classList.remove("showAlert");
// 		installAlert.classList.remove("showAlert");
// 		errorAlert.classList.remove("showAlert");
// 	});
// });

// export { chain, installAlert, disConnectedToMainet };
