import { ercABI } from './resume.js';
import ethChains from './ethereumchains.js';
import metasender from './contracts/metasender.js';
import { finalData } from './finalData.js';
import ethereumchains from './ethereumchains.js';
import idioms from './idioms.js';
import { changeLanguage, languaje, toggleLanguage } from './translate.js';
import { walletCount } from './manualWallets.js';
import { setConnection, setPalcoTexts } from './connectWallet.js';
const errorAlert = document.querySelector('.errorsAlert');
const connectedToMainet = document.querySelector('.connectedToWeb3Netwrok');
const selectChainItem = document.querySelector('.option-red select');
const tokenInput = document.getElementById('token-input');
const fileTokenInput = document.querySelector('.token-input-file');
const installAlert = document.querySelector('.installAlert');
const manWalletsCont = document.querySelector('.manual-wallets-container');
const manIncorrectWalletsCont = document.querySelector(
	'.incorrect-wallets-container'
);
const pageloader = document.querySelector('.loaderContainer');
const optinonRed = document.querySelector('.option-red select');

export function removeClass(items, className) {
	for (const item of items) item.classList.remove(className);
}

export function addClass(items, className) {
	for (const item of items) item.classList.add(className);
}

export async function getTokenSymbol(_address) {
	const provider = new ethers.providers.Web3Provider(window.ethereum);

	const contract = new ethers.Contract(_address, ercABI, provider);

	return await contract.symbol();
}

export function handleError(error) {
	if (error.error) showErrorAlert(error.error.message);
	else showErrorAlert(error.message);
}

export function showConnectAlert() {
	connectedToMainet.classList.add('showAlert');
	connectedToMainet.style.zIndex = 50;

	setTimeout(() => {
		connectedToMainet.classList.remove('showAlert');
		connectedToMainet.style.zIndex = 0;
	}, 5000);
}

export function showErrorAlert(msg) {
	errorAlert.children[1].innerHTML = msg;

	errorAlert.classList.add('showAlert');
}

export function showInfoAlert(msg, time = 5000) {
	errorAlert.children[1].innerHTML = msg;

	errorAlert.classList.add('showAlert');

	setTimeout(() => {
		errorAlert.classList.remove('showAlert');
	}, time);
}

export function changeTokenItems(chainId) {
	tokenInput.children[0].innerHTML = ethChains[chainId].symbol;

	fileTokenInput.children[1].innerHTML = ethChains[chainId].symbol;

	selectChainItem.value = chainId;
}

export function verifyAddress(_address) {
	return ethers.utils.isAddress(_address);
}

export function getContract(address, abi) {
	const provider = new ethers.providers.Web3Provider(window.ethereum);

	const signer = provider.getSigner();

	return new ethers.Contract(address, abi, signer);
}

export function userDeviceInfo() {
	const isMobile = {
			android: () => navigator.userAgent.match(/android/i),
			ios: () => navigator.userAgent.match(/iphone|ipad|ipod/i),
			windows: () => navigator.userAgent.match(/windows phone/i),
			any: function () {
				return this.android() || this.ios() || this.windows();
			},
		},
		isDesktop = {
			linux: () => navigator.userAgent.match(/linux/i),
			mac: () => navigator.userAgent.match(/mac os/i),
			windows: () => navigator.userAgent.match(/windows nt/i),
			any: function () {
				return this.linux() || this.mac() || this.windows();
			},
		},
		isBrowser = {
			chrome: () => navigator.userAgent.match(/chrome/i),
			safari: () => navigator.userAgent.match(/safari/i),
			firefox: () => navigator.userAgent.match(/firefox/i),
			opera: () => navigator.userAgent.match(/opera|opera mini/i),
			ie: () => navigator.userAgent.match(/msie|iemobile/i),
			edge: () => navigator.userAgent.match(/edge/i),
			any: function () {
				return (
					this.chrome() ||
					this.safari() ||
					this.firefox() ||
					this.opera() ||
					this.ie() ||
					this.edge()
				);
			},
		};
	let userInfo;

	if (isDesktop.any()) {
		userInfo = {
			desktop: true,
			mobile: false,
			operatingSistem: isDesktop.any(),
			browser: isBrowser.any(),
		};
		return userInfo;
	} else {
		userInfo = {
			desktop: false,
			mobile: true,
			operatingSistem: isMobile.any(),
			browser: isBrowser.any(),
		};
		return userInfo;
	}
}

export async function isPalco() {
	const contract = getContract(
		metasender[`address_${ethereum.chainId}`],
		metasender.abi
	);

	return contract.PALCO(ethereum.selectedAddress).catch(handleError);
}

export async function handleTxFee() {
	const contract = getContract(
		metasender[`address_${ethereum.chainId}`],
		metasender.abi
	);

	const isPalcoM = await isPalco().catch(handleError);

	if (isPalcoM) return ethers.utils.parseEther('0');

	return await contract.txFee().catch(handleError);
}

export async function handlePalco() {
	finalData.isPalco = await isPalco();

	if (finalData.isPalco) {
		setPalcoTexts(
			'<div class="isPalco">PALCO MEMBER</div>',
			idioms[languaje]['send-process']['send-process-resume-txCost-Palco']
		);
	} else {
		setPalcoTexts(
			'',
			idioms[languaje]['send-process']['send-process-resume-txCost']
		);
	}
}

export function showInstallAlert() {
	if (!window.ethereum) installAlert.classList.add('showAlert');
}

export function deleteBatch() {
	finalData.repeated = [];

	walletCount.correct = 0;

	walletCount.id = 0;

	walletCount.incorrect = 0;

	manWalletsCont.innerHTML =
		idioms[languaje]['send-process'].correct_data_Title;

	manIncorrectWalletsCont.innerHTML =
		idioms[languaje]['send-process'].incorrect_data_Title;
}

export function changeWalletsTokenType() {
	const walletsTokenType = document.querySelectorAll('.token-type');

	if (walletsTokenType.length == 0) return;

	walletsTokenType.forEach((e) => {
		tokenInput.value == 'ETH'
			? (e.innerHTML = ethereumchains[ethereum.chainId].symbol)
			: (e.innerHTML = tokenInput.value);
	});
}

export async function onLoad() {
	pageloader.style.display = 'none';
	// change
	optinonRed.value = '0x1';

	tokenInput.value = 'ETH';

	fileTokenInput.value = '';

	changeLanguage();

	if (ethereum.selectedAddress) {
		await setConnection();
	}
}

export function getShortAddress(address) {
	const start = address.match(/^\w{5}/);

	const end = address.match(/\w{4}$/);

	return start + '...' + end;
}
