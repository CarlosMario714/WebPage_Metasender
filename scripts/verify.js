import { addIncorrectWalletElement, addOkWalletElement } from "./addWallet.js";
import ethereumchains from "./ethereumchains.js";
import { verifyAddress } from "./tools.js";
const spanWallet = document.querySelector(".span-wallet");
const spanAmount = document.querySelector(".span-amount");
const walletInput = document.querySelector(".wallet-input");
const amountInput = document.querySelector(".amount-input");
const spanContractAdressManual = document.querySelector(
  ".span-contract-manual"
);
const inputContractManual = document.querySelector(".input-contract-manual");
export let walletAdressForVerify = [];

// verify the info of the excel file

export function verifyFileData(wallet, amount, typeOfToken) {
  let AmountRegex = new RegExp(amountInput.pattern);
  let walletError = "wallet error";
  let amountError = "amount error";
  let allError = "all errors";
  let repitedWallet = false;
  typeOfToken == 'ETH' 
    ? typeOfToken = ethereumchains[ ethereum.chainId ].symbol
    : typeOfToken;

  walletAdressForVerify.push(wallet);

  //if is ok data data from file
  if (verifyAddress(wallet) && AmountRegex.exec(amount)) {
    walletAdressForVerify.forEach((wallet, index) => {
      walletAdressForVerify.indexOf(wallet) !== index
        ? (repitedWallet = true)
        : (repitedWallet = false);
    });
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
  typeOfToken == 'ETH' 
    ? typeOfToken = ethereumchains[ ethereum.chainId ].symbol
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
