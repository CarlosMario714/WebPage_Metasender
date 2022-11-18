import idioms from "./idioms.js";
import {
  walletCount,
  showWallets,
  newWalletsFragment,
  newIncorrectsWalletsFragment,
  renameNumberOfWallets,
} from "./manualWallets.js";
import { languaje } from "./translate.js";
import { verifyManualData } from "./verify.js";
const manualWalletsContainer = document.querySelector(
  ".manual-wallets-container"
);
const walletInput = document.querySelector(".wallet-input");
const amountInput = document.querySelector(".amount-input");
const spanWallet = document.querySelector(".span-wallet");
const spanAmount = document.querySelector(".span-amount");
const tokenInput = document.getElementById("token-input");
const continueBtnManual = document.querySelector(".continue-btn-manual");

//add new ok wallet element
export function addOkWalletElement(wallet, amount, typeOfToken, repitedWallet) {
  walletCount.correct += 1;
  let newWalletContainer = document.createElement("div");
  newWalletContainer.id = walletCount.correct;
  newWalletContainer.classList.add("individual-wallet-container");
  const manualWallet = `
  <div class="manual-wallet">
    <p class="number-of-wallet">${walletCount.correct}</p>
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
    </a>
  </div>`;
  const repitedWalletElement = idioms[languaje].incorrectElement.repitedWallet;

  if (repitedWallet) {
    newWalletContainer.innerHTML = manualWallet + repitedWalletElement;
    newWalletsFragment.appendChild(newWalletContainer);
  } else {
    newWalletContainer.innerHTML = manualWallet;
    newWalletsFragment.appendChild(newWalletContainer);
  }
}

//add new error wallet element
export function addIncorrectWalletElement(
  wallet,
  amount,
  typeOfToken,
  whatError
) {
  walletCount.incorrect += 1;
  let newWalletErrorsContainer = document.createElement("div");
  newWalletErrorsContainer.id = walletCount.incorrect;
  newWalletErrorsContainer.classList.add("wallet-errors-container");
  const walleterrorElement = `
    <div id="${walletCount.incorrect}" class="manual-wallet">
      <p class="number-of-wallet number-of-incorrect-wallet">${walletCount.incorrect}</p>
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

  const onlyWalletError = idioms[languaje].incorrectElement.onlyWalletError;

  const onlyAmountError = idioms[languaje].incorrectElement.onlyAmountError;

  const allErrors = idioms[languaje].incorrectElement.allErrors;

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

export function deleteOkWallet(event) {
  manualWalletsContainer.removeChild(event.target.parentNode.parentNode);
}

export function editOkWallet(event) {
  let parentElement = event.target.parentNode.parentNode;
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

export function addWallet() {
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
