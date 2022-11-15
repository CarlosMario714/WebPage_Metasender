import { login, isConnected } from "./connectWallet.js";
import setResumeInfo, { isAproved } from "./resume.js";
import { finalData, setFinalData } from "./finalData.js";
import ethChains from "./ethereumchains.js";
import ethereumchains from "./ethereumchains.js";
import { handleError, verifyAddress, showErrorAlert } from "./tools.js";
import { getTotalValue } from "./transactions.js";
const manualWalletsContainer = document.querySelector(
  ".manual-wallets-container"
);
const addWalletButton = document.querySelector(".add-wallet-button");
const walletInput = document.querySelector(".wallet-input");
const amountInput = document.querySelector(".amount-input");
const optionManual = document.querySelector(".option-manual");
const optionFile = document.querySelector(".option-file");
const tokenAddContainer = document.querySelectorAll(".token-address")[0];
const manualDataContainer = document.querySelector(".manual-data-container");
const fileDataContainer = document.querySelector(".file-data-container");
const continueBtnManual = document.querySelector(".continue-btn-manual");
const sendProcessSection = document.getElementById("send-process");
const tokenInput = document.getElementById("token-input");
const labelAdress = document.querySelector(".label-adress");
const labelAmount = document.querySelector(".label-amount");
const spanWallet = document.querySelector(".span-wallet");
const spanAmount = document.querySelector(".span-amount");
const resumenFinalContainer = document.querySelector(
  ".resumen-final-container"
);
const blockExplorerLinkItem = document.querySelector(".blockExplorerLink");
const tituloDatosCorrectos = document.querySelector(
  ".manual-wallets-container h2"
);
const atrasbtn = document.querySelector(".atras-btn");
//resumen operacion
const totalWallets = document.querySelector(".total-wallets");
const totalTokens = document.querySelectorAll(".total-tokens");
const balanceTokens = document.querySelector(".balance-tokens");
const balanceEth = document.querySelector(".balance-eth");
const costoOperacion = document.querySelector(".costo-operacion");
const costoTotalOperacion = document.querySelector(".costo-operacion-total");
const loaderSendProcess = document.querySelector(".loader-send-process");
let numberOfCorrectNewWallet = 0;
let numberOfIncorrectNewWallet = 0;
let newWalletsFragment = document.createDocumentFragment();

let newIncorrectsWalletsFragment = document.createDocumentFragment();
const incorrectWalletsContainer = document.querySelector(
  ".incorrect-wallets-container"
);

optionManual.addEventListener("click", () => {
  if (isConnected) {
    manualDataContainer.style.display = "flex";
    fileDataContainer.style.display = "none";
    resumenFinalContainer.style.display = "none";
  } else login();
});

export function changeTypeOfToken() {
  switch (tokenInput.value) {
    case "ETH":
      labelAdress.innerHTML = "Account or Wallet to send";
      walletInput.placeholder = "Write the wallet";
      labelAmount.innerHTML = "Amount to send";
      amountInput.placeholder = "Write the amount";
      amountInput.pattern = `^\\d*\\.\\d+$|^\\d*\\d+$`;
      tokenAddContainer.style.display = "none";
      break;
    case "ERC20":
      labelAdress.innerHTML = "Token Contract Address";
      walletInput.placeholder = "Write the address of the contract";
      labelAmount.innerHTML = "Amount of tokens to send";
      amountInput.placeholder = "Write amount of tokens";
      amountInput.pattern = `^\\d*\\.\\d+$|^\\d*\\d+$`;
      tokenAddContainer.style.display = "block";
      break;
    case "ERC721":
      labelAdress.innerHTML = "Token Contract Address";
      walletInput.placeholder = "Write the address of the contract";
      labelAmount.innerHTML = "ID of the token to send";
      amountInput.placeholder = "Write the ID of the token";
      amountInput.pattern = `^\\d*\\d+$`;
      amountInput.innerHTML = `only positive integers`;
      tokenAddContainer.style.display = "block";
      break;
  }
}

function addWallet() {
  if (walletInput.value && amountInput.value !== "") {
    let walletWithoutSpaces = walletInput.value.trim();
    let amountWithoutSpacesString = amountInput.value.toString().trim();
    let amountWithoutSpacesNumber = Number(amountWithoutSpacesString);

    verifyManualData(
      walletWithoutSpaces,
      amountWithoutSpacesNumber,
      tokenInput.value
    );

    showWallets();
    continueBtnManual.classList.add("opacity");
  } else {
    if (walletInput.value == "") {
      spanWallet.innerHTML = "Fill in this field";
      spanWallet.classList.add("is-active");
      setTimeout(() => {
        spanWallet.classList.remove("is-active");
        spanWallet.innerHTML = walletInput.title;
      }, 3000);
    }

    if (amountInput.value == "") {
      spanAmount.innerHTML = "Fill in this field";
      spanAmount.classList.add("is-active");
      setTimeout(() => {
        spanAmount.classList.remove("is-active");
        spanAmount.innerHTML = amountInput.title;
      }, 3000);
    }
  }
}

function verifyManualData(wallet, amount, typeOfToken) {
  let walletRegex = new RegExp(walletInput.pattern);
  let AmountRegex = new RegExp(amountInput.pattern);

  //if all data is ok
  if (verifyAddress(wallet) && AmountRegex.exec(amount)) {
    addOkWalletElement(wallet, amount, typeOfToken);
    walletInput.value = "";
    amountInput.value = "";
  }

  //if is a wallet error
  !verifyAddress(wallet)
    ? spanWallet.classList.add("is-active")
    : spanWallet.classList.remove("is-active");

  //if is a wallet error
  !AmountRegex.exec(amount)
    ? spanAmount.classList.add("is-active")
    : spanAmount.classList.remove("is-active");
}

function verifyFileData(wallet, amount, typeOfToken) {
  let walletRegex = new RegExp(walletInput.pattern);
  let AmountRegex = new RegExp(amountInput.pattern);
  let walletError = "wallet error";
  let amountError = "amount error";
  let allError = "all errors";

  //if is ok data data form file
  if (verifyAddress(wallet) && AmountRegex.exec(amount)) {
    addOkWalletElement(wallet, amount, typeOfToken);
  }

  //if is a error data form file
  if (!verifyAddress(wallet) || !AmountRegex.exec(amount)) {
    //if the wallet have all errors
    if (!verifyAddress(wallet) && !AmountRegex.exec(amount)) {
      addIncorrectWalletElement(wallet, amount, typeOfToken, allError);
    } else {
      //if the wallet have only a specific error
      //if is a wallet error
      if (!verifyAddress(wallet)) {
        addIncorrectWalletElement(wallet, amount, typeOfToken, walletError);
      }

      //if is a amount error
      if (!AmountRegex.exec(amount)) {
        addIncorrectWalletElement(wallet, amount, typeOfToken, amountError);
      }
    }
  }
}

function deleteOkWallet(event) {
  manualWalletsContainer.removeChild(event.target.parentNode.parentNode);
}

function editOkWallet(event) {
  let parentElement = event.target.parentNode.parentNode;
  //console.log(parentElement.childNodes);
  parentElement.childNodes.forEach((element) => {
    if (element.classList == "wallet-adress") {
      walletInput.value = element.innerHTML;
    }
    if (element.classList == "wallet-amount") {
      amountInput.value = element.innerHTML;
    }
  });
  walletInput.classList.add("edit");
  amountInput.classList.add("edit");
  setTimeout(() => {
    walletInput.classList.remove("edit");
    amountInput.classList.remove("edit");
  }, 1000);
  manualWalletsContainer.removeChild(parentElement);
  renameNumberOfWallets();
}

//rename wallets when someone is delete
function renameNumberOfWallets() {
  let numberOfWallet = document.querySelectorAll(".number-of-wallet");

  for (let i = 0; i < numberOfWallet.length; i++) {
    numberOfWallet[i].parentNode.id = i + 1;
    numberOfWallet[i].innerHTML = i + 1;
    numberOfCorrectNewWallet = i + 1;
  }
}

function deleteIncorrectWallet(event) {
  incorrectWalletsContainer.removeChild(
    event.target.parentNode.parentNode.parentNode
  );
  renameNumberOfIncorrectWallets();
  hideIncorrectWalletsContainer();
}

function editIncorrectWallet(event) {
  let parentElement = event.target.parentNode.parentNode.parentNode;
  let parentElement2 = event.target.parentNode.parentNode;
  parentElement2.childNodes.forEach((element) => {
    if (element.classList == "wallet-adress") {
      walletInput.value = element.innerHTML;
    }
    if (element.classList == "wallet-amount") {
      amountInput.value = element.innerHTML;
    }
  });
  walletInput.classList.add("edit");
  amountInput.classList.add("edit");
  setTimeout(() => {
    walletInput.classList.remove("edit");
    amountInput.classList.remove("edit");
  }, 1000);
  incorrectWalletsContainer.removeChild(parentElement);
  renameNumberOfIncorrectWallets();
  hideIncorrectWalletsContainer();
}

function renameNumberOfIncorrectWallets() {
  let numberOfWallet = document.querySelectorAll(".number-of-incorrect-wallet");

  for (let i = 0; i < numberOfWallet.length; i++) {
    numberOfWallet[i].parentNode.id = i + 1;
    numberOfWallet[i].innerHTML = i + 1;
    numberOfIncorrectNewWallet = i + 1;
  }
}

function hideIncorrectWalletsContainer() {
  if (incorrectWalletsContainer.childNodes.length < 4) {
    incorrectWalletsContainer.style.display = "none";
    return true;
  } else return false;
}

//add new ok wallet element
function addOkWalletElement(wallet, amount, typeOfToken) {
  numberOfCorrectNewWallet += 1;
  let newWalletContainer = document.createElement("div");
  newWalletContainer.id = numberOfCorrectNewWallet;
  newWalletContainer.classList.add("manual-wallet");
  newWalletContainer.innerHTML = `
    <p class="number-of-wallet">${numberOfCorrectNewWallet}</p>
    <p class="wallet-adress">${wallet}</p>
    <p class="wallet-amount">${amount}</p>
    <p>${typeOfToken}</p>
    <a>
      <img class="edit-wallet" src="../img/icons/boton-editar.png"
        alt="cerrar pagina" />
    </a>
    <a>
      <img class="delete-wallet" src="../img/icons/cerrar.png"
        alt="cerrar pagina" />
    </a>`;
  newWalletsFragment.appendChild(newWalletContainer);
}

//add new error wallet element
function addIncorrectWalletElement(wallet, amount, typeOfToken, whatError) {
  numberOfIncorrectNewWallet += 1;
  let newWalletErrorsContainer = document.createElement("div");
  newWalletErrorsContainer.id = numberOfIncorrectNewWallet;
  newWalletErrorsContainer.classList.add("wallet-errors-container");
  let walleterrorElement = `
  <div id="${numberOfIncorrectNewWallet}" class="manual-wallet">
    <p class="number-of-wallet number-of-incorrect-wallet">${numberOfIncorrectNewWallet}</p>
    <p class="wallet-adress">${wallet}</p>
    <p class="wallet-amount">${amount}</p>
    <p>${typeOfToken}</p>
    <a>
      <img class="edit-wallet" src="../img/icons/boton-editar.png" alt="cerrar pagina" />
    </a>
    <a>
      <img class="delete-wallet" src="../img/icons/cerrar.png" alt="cerrar pagina" />
    </a>
  </div>`;
  let onlyWalletError = `
  <div class="wallet-errors">
    <p><span>Invalid Wallet or Address: </span>Add a valid Address without spaces</p>
  </div>`;
  let onlyAmountError = `
  <div class="wallet-errors">
    <p><span>Monto no valido:</span> Only positive numbers</p>
  </div>`;
  let allErrors = `
  <div class="wallet-errors">
    <p><span>Invalid Wallet or Address:</span> "write a valid address without spaces</p>
    <p><span>Monto no valido:</span> Solo numeros positivos</p>
  </div>`;

  switch (whatError) {
    case "wallet error":
      newWalletErrorsContainer.innerHTML = walleterrorElement + onlyWalletError;
      break;
    case "amount error":
      newWalletErrorsContainer.innerHTML = walleterrorElement + onlyAmountError;
      break;
    case "all errors":
      newWalletErrorsContainer.innerHTML = walleterrorElement + allErrors;
      break;
  }

  newIncorrectsWalletsFragment.appendChild(newWalletErrorsContainer);
}

function showWallets() {
  manualWalletsContainer.appendChild(newWalletsFragment);

  if (newIncorrectsWalletsFragment.childNodes.length > 0) {
    tituloDatosCorrectos.style.display = "block";
    incorrectWalletsContainer.style.display = "flex";
    incorrectWalletsContainer.appendChild(newIncorrectsWalletsFragment);
  }

  continueBtnManual.style.display = "block";
}

//select type of token
tokenInput.addEventListener("click", () => {
  changeTypeOfToken();
});

//verify data and add new wallet
addWalletButton.addEventListener("click", () => {
  addWallet();
});

//delete ok wallet and edit ok wallet
manualWalletsContainer.addEventListener("click", (e) => {
  if (e.target.classList[0] == "delete-wallet") {
    deleteOkWallet(e);
    renameNumberOfWallets();
  }

  if (e.target.classList[0] == "edit-wallet") {
    editOkWallet(e);
  }
});

//delete incorrect wallet and edit incorrect wallet
incorrectWalletsContainer.addEventListener("click", (e) => {
  if (e.target.classList[0] == "delete-wallet") {
    deleteIncorrectWallet(e);

    //renameNumberOfWallets();
  }
  if (e.target.classList[0] == "edit-wallet") {
    editIncorrectWallet(e);
  }
});

function getAddAndAmounts() {
  const addresses = [];

  const amounts = [];

  const walletAdress = document.querySelectorAll(".wallet-adress");

  const walletMount = document.querySelectorAll(".wallet-amount");

  walletAdress.forEach((walletAddres) => {
    addresses.push(walletAddres.innerHTML);
  });

  walletMount.forEach((walletMount) => {
    amounts.push(walletMount.innerHTML);
  });

  return { addresses, amounts };
}

async function setDataAndShowResume() {
  loaderSendProcess.classList.toggle("show-loader-send-process");

  await setFinalResume();

  loaderSendProcess.classList.toggle("show-loader-send-process");

  manualDataContainer.style.display = "none";
  resumenFinalContainer.style.display = "flex";
  blockExplorerLinkItem.style.opacity = 0;
}

async function hadleAllowance(amounts) {
  if (tokenInput.value == "ERC20")
    return await isAproved(getTotalValue(amounts));
  else
    return {
      aproveAmount: 0,
      aproveAmount: true,
    };
}

async function handleContinue() {
  if (!hideIncorrectWalletsContainer())
    return showErrorAlert(`Fix Incorrect Info`);

  const { addresses, amounts } = getAddAndAmounts();

  setFinalData(addresses, amounts);

  // const { aprove, totalAmount, isAprovedA } = await hadleAllowance( finalData.amount )

  // if( !isAprovedA ) return showErrorAlert(`Allowance ${aprove} need ${totalAmount}`)

  if (addresses.length == amounts.length && addresses.length > 0) {
    if (tokenInput.value == "ETH") setDataAndShowResume(addresses, amounts);
    else {
      if (verifyAddress(tokenAddContainer.children[1].value))
        setDataAndShowResume(addresses, amounts);
    }
  }
}

async function setFinalResume() {
  return await setResumeInfo().then(() => {
    totalWallets.innerHTML = finalData.numAddresses;

    totalTokens[0].innerHTML = `${finalData.totalToSend} ${finalData.tokenSymbol}`;

    totalTokens[1].innerHTML = `${finalData.totalToSend} ${finalData.tokenSymbol}`;

    balanceTokens.innerHTML = `${finalData.userTokenBalance} ${finalData.tokenSymbol}`;

    balanceEth.innerHTML = `${finalData.userETHBalance} ${finalData.NativeToken}`;

    costoOperacion.innerHTML = `${finalData.txCost} ${finalData.NativeToken}`;

    costoTotalOperacion.innerHTML = `${finalData.totalCost} ${finalData.NativeToken}`;
  });
}

atrasbtn.addEventListener("click", () => {
  manualDataContainer.style.display = "flex";
  resumenFinalContainer.style.display = "none";
});

continueBtnManual.addEventListener("click", handleContinue);

export { verifyFileData, showWallets };
