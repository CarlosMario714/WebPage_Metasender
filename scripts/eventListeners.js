import { addWallet, deleteOkWallet, editOkWallet } from "./addWallet.js";
import { handleAproval } from "./allowance.js";
import { isConnected, login, setChain } from "./connectWallet.js";
import { changeTypeOfToken, handleManualContinue, deleteIncorrectWallet, renameNumberOfWallets, editIncorrectWallet } from "./manualWallets.js";
import { file, handleDrop, handleFileContinue, migrateInfo, processFile, showFile } from "./readFile.js";
import { handleSend, metasenderFunctions } from "./transactions.js";
import { toggleLanguage } from "./translate.js";
import { removeClass, showErrorAlert, userDeviceInfo } from "./tools.js";

// navbar
const hamburguer = document.querySelector(".hamburguer");
const languageButtons = document.querySelector(".language");
const sideBackground = document.querySelector(".sidenavbar-background");
// connect with metamask
const connectedToMainet = document.querySelector(".connectedToWeb3Netwrok");
const errorAlert = document.querySelector(".errorsAlert");
const installAlert = document.querySelector(".installAlert");
const optinonRed = document.querySelector(".option-red select");
const closeAlert = document.querySelectorAll(".closeAlert");
const btnConnect = document.querySelector(".btnConnect");
// file wallets 
// change
const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const input = dropArea.querySelector("#input-file");
const optionFile = document.querySelector(".option-file");
const button = dropArea.querySelector("button");
const tokenAddContainerFile = document.querySelectorAll(".token-address")[1];
const tokenAddressInputFile = tokenAddContainerFile.children[1];
const tokenInputFile = document.querySelector(".token-input-file");
const continueBtnFile = document.querySelector(".continue-btn-file");
// manual wallets
const pageloader = document.querySelector('.loaderContainer')
const tokenInput = document.getElementById("token-input");
const addWalletButton = document.querySelector(".add-wallet-button");
const manualWalletsContainer = document.querySelector(
    ".manual-wallets-container"
);
const incorrectWalletsContainer = document.querySelector(
    ".incorrect-wallets-container"
);
const continueBtnManual = document.querySelector(".continue-btn-manual");
const optionManual = document.querySelector(".option-manual");
const manualDataContainer = document.querySelector(".manual-data-container");
const fileDataContainer = document.querySelector(".file-data-container");
const resumenFinalContainer = document.querySelector(
    ".resumen-final-container"
);
const atrasbtn = document.querySelector(".atras-btn");
// allowance
const btnAprove = document.querySelector('.btn-aprove')
const aproveItem = document.querySelector(".aprove-erc20-container");
const aproveCloseItem = document.querySelector(".close-aproval-erc20");

const contenedorBotonesNavbar = document.querySelector(
    ".contenedor-botones-navbar"
);
// send
const btnSend = document.querySelector('.send-btn')
// palco
const btnPalco = document.querySelector('.btn-palco')

/***************************************************************************/
/***************************** WINDOW **************************************/

window.addEventListener('load', () => pageloader.style.display = "none")

/***************************************************************************/
/***************************** NAVBAR **************************************/

//prende y apaga el side navbar

hamburguer.onclick = () => {
    contenedorBotonesNavbar.classList.toggle("showbuttons");
    sideBackground.classList.toggle("show-sideNavbar-backchround");
};

//prende y apaga el side navbar cuando se le da click por fuera

sideBackground.onclick = () => {
    sideBackground.classList.toggle("show-sideNavbar-backchround");
    contenedorBotonesNavbar.classList.toggle("showbuttons");
};

languageButtons.addEventListener("click", toggleLanguage);

/***************************************************************************/
/************************* CONNECT METAMASK ********************************/

// set function to the buttons

btnConnect.addEventListener("click", () => { if (!isConnected) login() });

//close alerts

closeAlert.forEach((alert) => {
    alert.addEventListener("click", function () {
        removeClass(
            [connectedToMainet, installAlert, errorAlert],
            "showAlert"
        );
    });
});

//select chain
optinonRed.addEventListener("change", setChain);

/***************************************************************************/
/************************ FILE WALLETS *************************************/

// ?

button.addEventListener("click", () => {
    input.click();
});

// ?

optionFile.addEventListener("click", () => {
    let userInfo = userDeviceInfo();
    if (userInfo.mobile) return showErrorAlert("Not available on movil devices");
    if (isConnected) {
        fileDataContainer.style.display = "flex";
        manualDataContainer.style.display = "none";
    } else login();
});

//detecta cada vez que input cambia, osea cada vez que se sube un archivo
input.addEventListener("change", async (e) => {
    e.preventDefault();
    file = e.target.files[0];

    showFile(file);

    await processFile().then(handleFileContinue);

    dropArea.classList.add("active");
    dropArea.classList.remove("active");
});

//elementos que se estan arrastrando encima del area
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to upload files";
});

//elementos que se estan arrastrando pero fuera del area
dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "drag and drop the file ";
});

//cuando de suelta un elemento en el area

dropArea.addEventListener("drop", handleDrop );

// this is to handle to show handle contiuen button

tokenInputFile.addEventListener("change", handleFileContinue );

tokenAddressInputFile.addEventListener("input", handleFileContinue );

tokenAddressInputFile.addEventListener("change", handleFileContinue);

// this migrate the info to manual section

continueBtnFile.addEventListener("click", migrateInfo);

/***************************************************************************/
/********************** MANUAL WALLETS *************************************/

// this change the manual inputs depending of toke type

tokenInput.addEventListener("change", changeTypeOfToken);

// this add a wallet and an amount 

addWalletButton.addEventListener("click", addWallet);

// this handle onclick in the address and amount item

manualWalletsContainer.addEventListener("click", (e) => {
    if (e.target.classList[0] == "delete-wallet") {
        deleteOkWallet(e);
        renameNumberOfWallets();
    }

    if (e.target.classList[0] == "edit-wallet") {
        editOkWallet(e);
    }
});

// this handle onclick in the address and amount item in incorrect data

incorrectWalletsContainer.addEventListener("click", (e) => {

    if (e.target.classList[0] == "delete-wallet") deleteIncorrectWallet(e);

    if (e.target.classList[0] == "edit-wallet") editIncorrectWallet(e);

});

// this show the option to add adress and amount manually

optionManual.addEventListener("click", () => {
    if (navigator.userAgentData.mobile)
        return showErrorAlert('Not available in movil devices')
    if (isConnected) {
        manualDataContainer.style.display = "flex";
        fileDataContainer.style.display = "none";
        resumenFinalContainer.style.display = "none";
    } else login();
});

// this is the continue button

continueBtnManual.addEventListener("click", handleManualContinue);

/***************************************************************************/
/**************************** APROVAL *************************************/

aproveCloseItem.addEventListener("click", () => {
    aproveItem.classList.toggle("show-aprove-erc20-container");
});

btnAprove.onclick = handleAproval

/***************************************************************************/
/**************************** RESUME ***************************************/

// this hide resume section and show manual data section

atrasbtn.addEventListener("click", () => {
    manualDataContainer.style.display = "flex";
    resumenFinalContainer.style.display = "none";
});

/***************************************************************************/
/**************************** SEND ***************************************/

// this is the sendButton

btnSend.addEventListener( "click", handleSend )

/***************************************************************************/
/***************************** PALCO ***************************************/

btnPalco.onclick = metasenderFunctions.addPALCO