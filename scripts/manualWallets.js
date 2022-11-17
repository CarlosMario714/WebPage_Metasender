import idioms from "./idioms.js";
import { setDataAndShowResume } from "./resume.js";
import { finalData, setFinalData } from "./finalData.js";
import { verifyAddress, showErrorAlert } from "./tools.js";
import { handleAllowance, isTokenAproved } from "./allowance.js";
import { languaje } from "./translate.js";
const manualWalletsContainer = document.querySelector(
  ".manual-wallets-container"
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
export const walletCount = {
  correct: 0,
  incorrect: 0,
};
export let newWalletsFragment = document.createDocumentFragment();
export let newIncorrectsWalletsFragment = document.createDocumentFragment();
const incorrectWalletsContainer = document.querySelector(
  ".incorrect-wallets-container"
);

export function changeTypeOfToken(item) {
  let tokenType = item;

  if (item.target) tokenType = item.target.value;

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

  for (let i = 0; i < numberOfWallet.length; i++) {
    numberOfWallet[i].parentNode.id = i + 1;
    numberOfWallet[i].innerHTML = i + 1;
    walletCount.correct = i + 1;
  }
}

export function deleteIncorrectWallet(event) {
  incorrectWalletsContainer.removeChild(
    event.target.parentNode.parentNode.parentNode
  );
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
  if (incorrectWalletsContainer.childNodes.length < 4) {
    incorrectWalletsContainer.style.display = "none";
    return true;
  } else return false;
}

export function showWallets() {
  manualWalletsContainer.appendChild(newWalletsFragment);

  if (newIncorrectsWalletsFragment.childNodes.length > 0) {
    tituloDatosCorrectos.style.display = "block";
    incorrectWalletsContainer.style.display = "flex";
    incorrectWalletsContainer.appendChild(newIncorrectsWalletsFragment);
  }

  continueBtnManual.style.display = "block";
}

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

export async function handleManualContinue() {
  if (!hideIncorrectWalletsContainer())
    return showErrorAlert(`Fix Incorrect Info`);

  const { addresses, amounts } = getAddAndAmounts();

  setFinalData(addresses, amounts);

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
