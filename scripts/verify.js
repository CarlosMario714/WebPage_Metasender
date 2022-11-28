import {
  addIncorrectWalletElement,
  addOkWalletElement,
  deleteOkWallet,
} from "./addWallet.js";
import ethereumchains from "./ethereumchains.js";
import { finalData } from "./finalData.js";
import idioms from "./idioms.js";
import { languaje } from "./translate.js";
import { verifyAddress } from "./tools.js";
import {
  newWalletsFragment,
  renameNumberOfWallets,
  walletCount,
} from "./manualWallets.js";
import { getTotalValue } from "./transactions.js";
const spanWallet = document.querySelector(".span-wallet");
const spanAmount = document.querySelector(".span-amount");
const walletInput = document.querySelector(".wallet-input");
const amountInput = document.querySelector(".amount-input");
const spanContractAdressManual = document.querySelector(
  ".span-contract-manual"
);
const inputContractManual = document.querySelector(".input-contract-manual");

const manualWalletsContainer = document.querySelector(
  ".manual-wallets-container"
);

// verify the info of the excel file

export function verifyFileData(wallet, amount, typeOfToken) {
  let AmountRegex = new RegExp(amountInput.pattern);
  let walletError = "wallet error";
  let amountError = "amount error";
  let allError = "all errors";
  let repitedWallet = false;
  typeOfToken == "ETH"
    ? (typeOfToken = ethereumchains[ethereum.chainId].symbol)
    : typeOfToken;

  finalData.repeated.push(wallet);

  //if is ok data data from file
  if (verifyAddress(wallet) && AmountRegex.exec(amount)) {
    addOkWalletElement(wallet, amount, typeOfToken, repitedWallet);
  }

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

// verify the info of the manual wallets

export function verifyManualData(wallet, amount, typeOfToken) {
  const amountRegex = new RegExp(amountInput.pattern);
  typeOfToken == "ETH"
    ? (typeOfToken = ethereumchains[ethereum.chainId].symbol)
    : typeOfToken;

  //if is selected native blockchain currency
  if (typeOfToken !== "ERC20" && typeOfToken !== "ERC721") {
    //if all data is ok
    if (verifyAddress(wallet) && amountRegex.exec(amount)) {
      addOkWalletElement(wallet, amount, typeOfToken);
      walletInput.value = "";
      amountInput.value = "";
    }

    //if is a wallet error
    !verifyAddress(wallet)
      ? spanWallet.classList.add("is-active")
      : spanWallet.classList.remove("is-active");

    //if is a wallet error
    !amountRegex.exec(amount)
      ? spanAmount.classList.add("is-active")
      : spanAmount.classList.remove("is-active");
  } else {
    //if is selected er20 or erc721
    //if all data is ok
    if (
      verifyAddress(wallet) &&
      amountRegex.exec(amount) &&
      verifyAddress(inputContractManual.value)
    ) {
      addOkWalletElement(wallet, amount, typeOfToken);
      walletInput.value = "";
      amountInput.value = "";
    }

    //if is a wallet error
    !verifyAddress(wallet)
      ? spanWallet.classList.add("is-active")
      : spanWallet.classList.remove("is-active");

    //if is a wallet error
    !amountRegex.exec(amount)
      ? spanAmount.classList.add("is-active")
      : spanAmount.classList.remove("is-active");

    //if is a contract error
    !verifyAddress(inputContractManual.value)
      ? spanContractAdressManual.classList.add("is-active")
      : spanContractAdressManual.classList.remove("is-active");
  }
}

export function verifyRepeatedWalletsFromFile() {
  const walletsAddres = newWalletsFragment.querySelectorAll(".wallet-adress");

  let allWalletsArr = [];

  walletsAddres.forEach((element) => {
    allWalletsArr.push(element.innerHTML);
  });

  allWalletsArr.forEach((wallet, index) => {
    let firstRepeated = allWalletsArr.indexOf(wallet);
    //if there are repeated wallets
    if (firstRepeated !== index) {
      //primera wallet container
      const individualWalletContainer = newWalletsFragment.getElementById(
        `${(firstRepeated += 1)}`
      );
      //wallets repetidas
      const repeatedWalletElement = newWalletsFragment.getElementById(
        `${(index += 1)}`
      );

      //add repeated wallet in first repeated wallet container
      individualWalletContainer.appendChild(repeatedWalletElement.children[0]);

      individualWalletContainer.classList.add("repeated-wallet-container");

      //delete container repeated wallet
      newWalletsFragment.removeChild(repeatedWalletElement);

      walletCount.id -= 1;
    }
  });

  //show repeated btn and text

  const repeatedWalletContainer = newWalletsFragment.querySelectorAll(
    ".repeated-wallet-container .repeated-wallet"
  );

  const combineAmountsBtn = newWalletsFragment.querySelectorAll(
    ".repeated-wallet-container .combine-amounts-btn"
  );

  repeatedWalletContainer.forEach((walletContainer) => {
    walletContainer.style.display = "block";
  });

  combineAmountsBtn.forEach((btn) => {
    btn.style.display = "block";
  });
}

export function verifyRepeatedWalletsFromManual() {
  const individualWalletContainer = document.querySelectorAll(
    ".individual-wallet-container"
  );
  const walletToVerify =
    newWalletsFragment.querySelector(".wallet-adress").innerHTML;
  const walletToInsert = newWalletsFragment.querySelector(".manual-wallet");
  const walletContainerFragment = newWalletsFragment.querySelector(
    ".individual-wallet-container"
  );

  let manualWalletsArr = [];

  individualWalletContainer.forEach((element) => {
    manualWalletsArr.push(
      element.children[0].querySelector(".wallet-adress").innerHTML
    );
  });

  //if there is repeated wallet
  if (manualWalletsArr.indexOf(walletToVerify) >= 0) {
    const firsWalletRepeated = document.getElementById(
      `${manualWalletsArr.indexOf(walletToVerify) + 1}`
    );
    const combineAmountsBtn = firsWalletRepeated.querySelector(
      ".combine-amounts-btn"
    );
    const textRepeatedWallets =
      firsWalletRepeated.querySelector(".repeated-wallet");

    //insert repeated wallet in first repeated wallet container
    firsWalletRepeated.appendChild(walletToInsert);

    if (firsWalletRepeated.classList[1] !== "repeated-wallet-container") {
      firsWalletRepeated.classList.add("repeated-wallet-container");
    }

    combineAmountsBtn.style.display = "block";
    textRepeatedWallets.style.display = "block";

    newWalletsFragment.removeChild(walletContainerFragment);

    renameNumberOfWallets();
  } else {
    return false;
  }
}

export function combineAmounts(individualWalletContainer) {
  const amountsElement =
    individualWalletContainer.querySelectorAll(".wallet-amount");
  const walletElement =
    individualWalletContainer.querySelectorAll(".manual-wallet");
  const combineAmountsBtn = individualWalletContainer.querySelector(
    ".combine-amounts-btn"
  );
  const textRepeatedWallets =
    individualWalletContainer.querySelector(".repeated-wallet");
  const amountsArr = [];

  amountsElement.forEach((amount) => {
    amountsArr.push(Number(amount.innerHTML));
  });

  const totalValue = amountsArr.reduce(
    (prevValue, nextValue) => prevValue + nextValue
  );

  amountsElement[0].innerHTML = totalValue.toFixed(6);

  for (let i = 1; i <= amountsElement.length - 1; i++) {
    individualWalletContainer.removeChild(walletElement[i]);
  }

  individualWalletContainer.classList.remove("repeated-wallet-container");

  combineAmountsBtn.style.display = "none";
  textRepeatedWallets.style.display = "none";

  renameNumberOfWallets();
}
