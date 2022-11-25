import idioms from "./idioms.js";
import { setDataAndShowResume } from "./resume.js";
import { finalData, setFinalData } from "./finalData.js";
import {
  verifyAddress,
  showErrorAlert,
  changeWalletsTokenType,
} from "./tools.js";
import { handleAllowance, isTokenAproved } from "./allowance.js";
import { languaje } from "./translate.js";
import { deleteOkWallet, editOkWallet } from "./addWallet.js";
import { combineAmounts, verifyRepeatedWalletsFromFile } from "./verify.js";
const manualWalletsContainer = document.querySelector(
  ".manual-wallets-container"
);
const manWalletsBtnsContainer = document.querySelector(
  ".send-process-buttons-container"
);
const walletInput = document.querySelector(".wallet-input");
const amountInput = document.querySelector(".amount-input");
const tokenAddContainer = document.querySelectorAll(".token-address")[0];
const continueBtnManual = document.querySelector(".continue-btn-manual");
const tokenInput = document.getElementById("token-input");
const labelAdress = document.querySelector(".label-adress");
const labelAmount = document.querySelector(".label-amount");
const tituloDatosCorrectos = document.querySelector(
  ".manual-wallets-container h2"
);
const sendProcessButtonsContainer = document.querySelector(
  ".send-process-buttons-container"
);
export const walletCount = {
  correct: 0,
  id: 0,
  incorrect: 0,
};
export let newWalletsFragment = document.createDocumentFragment();
export let newIncorrectsWalletsFragment = document.createDocumentFragment();
const incorrectWalletsContainer = document.querySelector(
  ".incorrect-wallets-container"
);

export function changeTypeOfToken(item) {
  if (item === "") return;

  let tokenType = item;

  if (item.target) tokenType = item.target.value;

  changeWalletsTokenType();

  walletInput.placeholder = idioms[languaje][tokenType].walletInput;

  labelAmount.innerHTML = idioms[languaje][tokenType].labelAmount;

  amountInput.placeholder = idioms[languaje][tokenType].amountInput_placeHolder;

  amountInput.pattern = idioms[languaje][tokenType].amountInput_pattern;

  amountInput.innerHTML = idioms[languaje][tokenType].amountInput_text;

  if (tokenType == "ETH") tokenAddContainer.style.display = "none";
  else tokenAddContainer.style.display = "block";
}

//rename wallets when someone is delete
export function renameNumberOfWallets() {
  let numberOfWallet = document.querySelectorAll(".number-of-wallet");
  let numberOfIndividualWallets = document.querySelectorAll(
    ".individual-wallet-container"
  );

  for (let i = 0; i < numberOfWallet.length; i++) {
    numberOfWallet[i].innerHTML = i + 1;
    walletCount.correct = i + 1;
  }

  for (let i = 0; i < numberOfIndividualWallets.length; i++) {
    numberOfIndividualWallets[i].id = i + 1;
    walletCount.id = i + 1;
  }
}

export function deleteIncorrectWallet(event) {
  console.log(incorrectWalletsContainer);
  incorrectWalletsContainer.removeChild(
    event.target.parentNode.parentNode.parentNode
  );
  walletCount.incorrect -= 1;
  renameNumberOfIncorrectWallets();
  hideIncorrectWalletsContainer();
}

export function editIncorrectWallet(event) {
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
  walletCount.incorrect -= 1;
  setTimeout(() => {
    walletInput.classList.remove("edit");
    amountInput.classList.remove("edit");
  }, 1000);
  incorrectWalletsContainer.removeChild(parentElement);
  renameNumberOfIncorrectWallets();
  hideIncorrectWalletsContainer();
}

export function renameNumberOfIncorrectWallets() {
  let numberOfWallet = document.querySelectorAll(".number-of-incorrect-wallet");

  for (let i = 0; i < numberOfWallet.length; i++) {
    numberOfWallet[i].parentNode.id = i + 1;
    numberOfWallet[i].innerHTML = i + 1;
    walletCount.incorrect = i + 1;
  }
}

function hideIncorrectWalletsContainer() {
  if (incorrectWalletsContainer.children.length <= 1) {
    incorrectWalletsContainer.style.display = "none";
    return true;
  } else return false;
}

export function showWallets() {
  manualWalletsContainer.appendChild(newWalletsFragment);
  renameNumberOfWallets();

  if (newIncorrectsWalletsFragment.childNodes.length > 0) {
    tituloDatosCorrectos.style.display = "block";
    incorrectWalletsContainer.style.display = "flex";
    incorrectWalletsContainer.appendChild(newIncorrectsWalletsFragment);
  }

  sendProcessButtonsContainer.style.display = "flex";

  //renameNumberOfWallets();

  // continueBtnManual.style.display = "block";
  // continueBtnManual.classList.add("opacity");
}

function getAddAndAmounts() {
  const addresses = [];

  const amounts = [];

  let notMatch = 0;

  const walletAdress = document.querySelectorAll(".wallet-adress");

  const walletAmount = document.querySelectorAll(".wallet-amount");

  walletAmount.forEach((walletAmount, i) => {
    const amount = Number(walletAmount.innerHTML);

    const regex = new RegExp(amountInput.pattern);

    if (regex.exec(`${amount}`)) notMatch++;

    amounts.push(amount);

    addresses.push(walletAdress[i].innerHTML);
  });

  return { addresses, amounts, isMatching: notMatch == 0 };
}

export async function handleManualContinue() {
  if (!hideIncorrectWalletsContainer())
    return showErrorAlert(idioms[languaje].alerts.incorrect_info);

  if (tokenInput.value !== "ETH") {
    if (!verifyAddress(tokenAddContainer.children[1].value))
      return showErrorAlert(idioms[languaje].alerts.contract_address);
  }

  const { addresses, amounts, isMatching } = getAddAndAmounts();

  if (isMatching)
    return showErrorAlert(
      "Error: " + idioms[languaje][tokenInput.value].amountInput_text
    );

  await setFinalData(addresses, amounts);

  const { isAproved } = await isTokenAproved(finalData.amount);

  if (!isAproved) return handleAllowance();

  if (addresses.length == amounts.length && addresses.length > 0) {
    if (tokenInput.value == "ETH") setDataAndShowResume(addresses, amounts);
    else {
      if (verifyAddress(tokenAddContainer.children[1].value))
        setDataAndShowResume(addresses, amounts);
    }
  }
}

export function handleWalletsClicks(e) {
  if (e.target.classList[0] == "delete-wallet") {
    deleteOkWallet(e);
    renameNumberOfWallets();
  }

  if (e.target.classList[0] == "edit-wallet") {
    editOkWallet(e);
  }

  if (e.target.classList[0] == "combine-amounts-btn") {
    combineAmounts(e.target.parentNode);
  }
}

export function handleIncorrectWalletClick(e) {
  if (e.target.classList[0] == "delete-wallet") deleteIncorrectWallet(e);

  if (e.target.classList[0] == "edit-wallet") editIncorrectWallet(e);
}
