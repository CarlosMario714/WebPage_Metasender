import {
	handleError,
	removeClass,
	showErrorAlert,
	showConnectAlert,
	changeTokenItems,
	handlePalco,
	changeWalletsTokenType,
	showInstallAlert,
  getShortAddress,
  showInfoAlert,
} from './tools.js';
import ethChains from './ethereumchains.js';
import idioms from './idioms.js';
import { languaje } from './translate.js';
const btnConnect = document.querySelector('.btnConnect');
const installAlert = document.querySelector('.installAlert');
const txCostTitle = document.querySelector(
	'[data-type="send-process-resume-txCost"]'
);
export let isConnected = false;

export function setPalcoTexts(palcoMember, txFee) {
	const start = ethereum.selectedAddress.match(/^\w{5}/);

	const end = ethereum.selectedAddress.match(/\w{4}$/);

	btnConnect.innerHTML = start + '...' + end + palcoMember;

	txCostTitle.innerHTML = txFee;
}

function listenChain() {
	ethereum.on('chainChanged', async (chainId) => {
		if (ethChains[chainId]) {
			changeTokenItems(chainId);

			changeWalletsTokenType();

			handlePalco();

			showConnectAlert();
		} else showErrorAlert('Network Not Supported');
	});
}

// Connect with a ethereum account ( only compatible with metamask )

async function connectWallet() {
	await window.ethereum
		.request({
			method: 'wallet_requestPermissions',
			params: [{ eth_accounts: {} }],
		})
		.then(async () => await setConnection())
		.catch(handleError);
}

export async function setConnection() {
	if (!window.ethereum) return showInstallAlert();

	if (ethereum.selectedAddress) isConnected = true;
	else isConnected = false;

	if (isConnected) {
		showInfoAlert(
			`${idioms[languaje].alerts.your_account} ${getShortAddress(
				ethereum.selectedAddress
			)} ${idioms[languaje].alerts.is_connected}`
		);

    handlePalco();

    listenChain();

    //remove listener if account changed
    ethereum.removeListener("accountsChanged", setConnection);

    //listener if account change
    changeAccount();
	} else {
    ethereum.removeListener("accountsChanged", setConnection);

    showInfoAlert(idioms[languaje].alerts.wallet_disconnected);

    btnConnect.innerHTML = `CONNECT WALLET <img src="./img/icons/Metamask-icon.png"alt="icono metamask">`
  }
}

function changeAccount() {
  ethereum.on("accountsChanged", setConnection);
}

// it change the chain to Ethereum main net

async function addChain(chain) {
	return await window.ethereum
		.request({
			method: 'wallet_addEthereumChain',
			params: [
				{
					chainId: chain,
					chainName: ethChains[chain].netName,
					nativeCurrency: {
						name: ethChains[chain].symbol,
						symbol: ethChains[chain].symbol,
						decimals: 18,
					},
					rpcUrls: [ethChains[chain].jsonRPC],
					blockExplorerUrls: [ethChains[chain].blockExplorer],
				},
			],
		})
		.catch(handleError);
}

async function changeChain(chain) {
	await window.ethereum
		.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: chain }],
		})
		.catch((error) => {
			if (error.code == 4902) addChain(chain);
			else handleError(error);
		});
}

export function setChain(e) {
	changeChain(e.target.value);
}

// calls connectWallet() and changeChain()

export async function login() {
	if (window.ethereum) {
		await connectWallet();

		//change
		await changeChain('0x1');
	} else {
		installAlert.classList.add('showAlert');
	}
}
