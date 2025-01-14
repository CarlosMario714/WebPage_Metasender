import { addWallet } from './addWallet.js';
import { handleAproval } from './allowance.js';
import { isConnected, login, setChain } from './connectWallet.js';
import {
	changeTypeOfToken,
	handleManualContinue,
	handleWalletsClicks,
	handleIncorrectWalletClick,
} from './manualWallets.js';
import {
	handleDelete,
	handleDrop,
	handleFileContinue,
	migrateInfo,
	onChangeFile,
} from './readFile.js';
import { buyPalcoPass, handleSend } from './transactions.js';
import { toggleLanguage, languaje } from './translate.js';
import {
	deleteBatch,
	onLoad,
	removeClass,
	showErrorAlert,
	userDeviceInfo,
} from './tools.js';
import idioms from './idioms.js';

// navbar
const hamburguer = document.querySelector('.hamburguer');
const languageButtons = document.querySelector('.language');
const sideBackground = document.querySelector('.sidenavbar-background');
// connect with metamask
const connectedToMainet = document.querySelector('.connectedToWeb3Netwrok');
const errorAlert = document.querySelector('.errorsAlert');
const installAlert = document.querySelector('.installAlert');
const optinonRed = document.querySelector('.option-red select');
const closeAlert = document.querySelectorAll('.closeAlert');
const btnConnect = document.querySelector('.btnConnect');
// file wallets
const dropArea = document.querySelector('.drop-area');
const dragText = dropArea.querySelector('h2');
const inputFileToUpload = dropArea.querySelector('#input-file');
const optionUploadFile = document.querySelector('.option-file');
const buttonUploadFile = dropArea.querySelector('button');
const tokenAddContainerFile = document.querySelectorAll('.token-address')[1];
const tokenAddressInputFile = tokenAddContainerFile.children[1];
const tokenInputFile = document.querySelector('.token-input-file');
const continueBtnFile = document.querySelector('.continue-btn-file');
// manual wallets
const pageloader = document.querySelector('.loaderContainer');
const tokenInput = document.getElementById('token-input');
const addWalletButton = document.querySelector('.add-wallet-button');
const manualWalletsContainer = document.querySelector(
	'.manual-wallets-container'
);
const incorrectWalletsContainer = document.querySelector(
	'.incorrect-wallets-container'
);
const deleteBatchBtn = document.querySelector('.continue-btn-delete');
const continueBtnManual = document.querySelector('.continue-btn-manual');
const optionManual = document.querySelector('.option-manual');
const manualDataContainer = document.querySelector('.manual-data-container');
const fileDataContainer = document.querySelector('.file-data-container');
const resumenFinalContainer = document.querySelector(
	'.resumen-final-container'
);
const atrasbtn = document.querySelector('.atras-btn');
// allowance
const btnAprove = document.querySelector('.btn-aprove');
const aproveItem = document.querySelector('.aprove-erc20-container');
const aproveCloseItem = document.querySelector('.close-aproval-erc20');

const contenedorBotonesNavbar = document.querySelector(
	'.contenedor-botones-navbar'
);
// send
const btnSend = document.querySelector('.send-btn');
// palco
const btnPalco = document.querySelector('.btn-palco');

/***************************************************************************/
/***************************** WINDOW **************************************/

window.addEventListener('load', async () => {
	await onLoad();
});

/***************************************************************************/
/***************************** NAVBAR **************************************/

//prende y apaga el side navbar

hamburguer.onclick = () => {
	contenedorBotonesNavbar.classList.toggle('showbuttons');
	sideBackground.classList.toggle('show-sideNavbar-backchround');
};

//prende y apaga el side navbar cuando se le da click por fuera

sideBackground.onclick = () => {
	sideBackground.classList.toggle('show-sideNavbar-backchround');
	contenedorBotonesNavbar.classList.toggle('showbuttons');
};

languageButtons.addEventListener('click', toggleLanguage);

/***************************************************************************/
/************************* CONNECT METAMASK ********************************/

// set function to the buttons

btnConnect.addEventListener('click', () => {
	if (!isConnected) login();
});

//close alerts

closeAlert.forEach((alert) => {
	alert.addEventListener('click', function () {
		removeClass([connectedToMainet, installAlert, errorAlert], 'showAlert');
	});
});

//select chain
optinonRed.addEventListener('change', setChain);

/***************************************************************************/
/************************ FILE WALLETS *************************************/

buttonUploadFile.addEventListener('click', () => {
	inputFileToUpload.click();
});

optionUploadFile.addEventListener('click', () => {
	const userInfo = userDeviceInfo();
	if (userInfo.mobile) return showErrorAlert('Not available on movil devices');
	if (isConnected) {
		fileDataContainer.style.display = 'flex';
		manualDataContainer.style.display = 'none';
		resumenFinalContainer.style.display = 'none';
	} else login();
});

//detecta cada vez que input cambia, osea cada vez que se sube un archivo
inputFileToUpload.addEventListener('change', onChangeFile);

//elementos que se estan arrastrando encima del area
dropArea.addEventListener('dragover', (e) => {
	e.preventDefault();
	dropArea.classList.add('active');
	dragText.textContent =
		idioms[languaje]['send-process']['send-process-drop-release'];
});

dropArea.addEventListener('click', handleDelete);

//elementos que se estan arrastrando pero fuera del area
dropArea.addEventListener('dragleave', (e) => {
	e.preventDefault();
	dropArea.classList.remove('active');

	dragText.textContent =
		idioms[languaje]['send-process']['send-process-drop-title'];
});

//cuando de suelta un elemento en el area

dropArea.addEventListener('drop', handleDrop);

// this is to handle to show handle contiuen button

tokenInputFile.addEventListener('change', handleFileContinue);

tokenAddressInputFile.addEventListener('input', handleFileContinue);

tokenAddressInputFile.addEventListener('change', handleFileContinue);

// this migrate the info to manual section

continueBtnFile.addEventListener('click', migrateInfo);

/***************************************************************************/
/********************** MANUAL WALLETS *************************************/

// this change the manual inputs depending of toke type

tokenInput.addEventListener('change', changeTypeOfToken);

// this add a wallet and an amount

addWalletButton.addEventListener('click', addWallet);

// this handle onclick in the address and amount item

manualWalletsContainer.addEventListener('click', handleWalletsClicks);

// this handle onclick in the address and amount item in incorrect data

incorrectWalletsContainer.addEventListener('click', handleIncorrectWalletClick);

// this show the option to add adress and amount manually

optionManual.addEventListener('click', () => {
	const userInfo = userDeviceInfo();
	if (userInfo.mobile) return showErrorAlert('Not available in movil devices');
	if (isConnected) {
		manualDataContainer.style.display = 'flex';
		fileDataContainer.style.display = 'none';
		resumenFinalContainer.style.display = 'none';
	} else login();
});

// this delete all the wallets

deleteBatchBtn.onclick = deleteBatch;

// this is the continue button

continueBtnManual.addEventListener('click', handleManualContinue);

/***************************************************************************/
/**************************** APROVAL *************************************/

aproveCloseItem.addEventListener('click', () => {
	aproveItem.classList.toggle('show-aprove-erc20-container');
});

btnAprove.onclick = handleAproval;

/***************************************************************************/
/**************************** RESUME ***************************************/

// this hide resume section and show manual data section

atrasbtn.addEventListener('click', () => {
	manualDataContainer.style.display = 'flex';
	resumenFinalContainer.style.display = 'none';
});

/***************************************************************************/
/**************************** SEND ***************************************/

// this is the sendButton

btnSend.addEventListener('click', handleSend);

/***************************************************************************/
/***************************** PALCO ***************************************/

btnPalco.onclick = buyPalcoPass;
