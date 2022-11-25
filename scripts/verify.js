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
    // finalData.repeated.forEach((wallet, index) => {
    //   finalData.repeated.indexOf(wallet) !== index
    //     ? (repitedWallet = true)
    //     : (repitedWallet = false);
    // });
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

  let repeatedWallets = [];

  walletsAddres.forEach((element) => {
    repeatedWallets.push(element.innerHTML);
  });

  repeatedWallets.forEach((wallet, index) => {
    let firstRepeated = repeatedWallets.indexOf(wallet);
    if (firstRepeated !== index) {
      //primera wallet container
      const individualWalletContainer = newWalletsFragment.getElementById(
        `${(firstRepeated += 1)}`
      );
      //wallets repetidas
      const repeatedWalletElement = newWalletsFragment.getElementById(
        `${(index += 1)}`
      );

      individualWalletContainer.appendChild(repeatedWalletElement.children[0]);

      individualWalletContainer.classList.add("repeated-wallet-container");

      newWalletsFragment.removeChild(repeatedWalletElement);

      //console.log(walletCount.id);
      walletCount.id -= 1;
      //console.log(walletCount.id);
    }
  });

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

export function verifyRepeatedWalletsFormManual() {
  const individualWalletContainer = document.querySelectorAll(
    ".individual-wallet-container"
  );
  const walletToVerify =
    newWalletsFragment.querySelector(".wallet-adress").innerHTML;
  const walletToInsert = newWalletsFragment.querySelector(".manual-wallet");
  const containerId = newWalletsFragment.querySelector(
    ".individual-wallet-container"
  );

  let manualWalletsArr = [];

  individualWalletContainer.forEach((element) => {
    manualWalletsArr.push(
      element.children[0].querySelector(".wallet-adress").innerHTML
    );
  });

  console.log(manualWalletsArr.indexOf(walletToVerify) + 1);

  if (manualWalletsArr.indexOf(walletToVerify) >= 0) {
    let walletElement = document.getElementById(
      `${manualWalletsArr.indexOf(walletToVerify) + 1}`
    );

    walletElement.appendChild(walletToInsert);

    if (walletElement.classList[1] !== "repeated-wallet-container") {
      walletElement.classList.add("repeated-wallet-container");
    }

    const combineAmountsBtn = walletElement.querySelector(
      ".combine-amounts-btn"
    );

    const textRepeatedWallets = walletElement.querySelector(".repeated-wallet");

    combineAmountsBtn.style.display = "block";
    textRepeatedWallets.style.display = "block";

    newWalletsFragment.removeChild(containerId);

    renameNumberOfWallets();
  } else {
    walletElement.classList.remove("repeated-wallet-container");

    repeatedWalletContainer.forEach((walletContainer) => {
      walletContainer.style.display = "none";
    });

    return false;
  }
}

export function combineAmounts(individualWallet) {
  const amountsElement = individualWallet.querySelectorAll(".wallet-amount");
  const walletElement = individualWallet.querySelectorAll(".manual-wallet");
  const amountsArr = [];

  amountsElement.forEach((amount) => {
    amountsArr.push(Number(amount.innerHTML));
  });

  const totalValue = amountsArr.reduce(
    (prevValue, nextValue) => prevValue + nextValue
  );

  amountsElement[0].innerHTML = totalValue;

  for (let i = 1; i <= amountsElement.length - 1; i++) {
    console.log(amountsElement[i]);
    individualWallet.removeChild(walletElement[i]);
  }

  renameNumberOfWallets();
}
