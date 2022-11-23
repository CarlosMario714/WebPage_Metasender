import { addIncorrectWalletElement, addOkWalletElement } from "./addWallet.js";
import ethereumchains from "./ethereumchains.js";
import { finalData } from "./finalData.js";
import idioms from "./idioms.js";
import { languaje } from "./translate.js";
import { verifyAddress } from "./tools.js";
const spanWallet = document.querySelector(".span-wallet");
const spanAmount = document.querySelector(".span-amount");
const walletInput = document.querySelector(".wallet-input");
const amountInput = document.querySelector(".amount-input");
const spanContractAdressManual = document.querySelector(
  ".span-contract-manual"
);
const inputContractManual = document.querySelector(".input-contract-manual");
const repetedWalletsContainer = document.querySelector(
  ".repeated-wallets-container"
);
const repitedWalletElementText = document.createElement("p");
repitedWalletElementText.classList.add("repeated-wallet");
repitedWalletElementText.innerHTML =
  idioms[languaje].incorrectElement.repitedWallet;

//idioms[languaje].incorrectElement.repitedWallet;

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

export function verifyRepeatedWallets() {
  const walletsAddres = document.querySelectorAll(".wallet-adress");
  let repeatedWallets = [];
  walletsAddres.forEach((element) => {
    repeatedWallets.push(element.innerHTML);
  });

  console.log(repeatedWallets);

  repeatedWallets.forEach((wallet, index) => {
    let firstRepeated = repeatedWallets.indexOf(wallet);
    if (firstRepeated !== index) {
      //primera wallet container
      const individualWalletContainer = document.getElementById(
        `${(firstRepeated += 1)}`
      );
      //wallets repetidas
      const repeatedWalletElement = document.getElementById(`${(index += 1)}`)
        .children[0];
      console.log(repeatedWalletElement);

      individualWalletContainer.appendChild(repeatedWalletElement);

      individualWalletContainer.classList.add("repeated-walled");

      //individualWalletContainer.appendChild(repitedWalletElementText);

      console.log((firstRepeated += 1), (index += 1));
    }

    const repeatedWalletContainer =
      document.querySelectorAll(".repeated-walled");

    console.log(repeatedWalletContainer);
    repeatedWalletContainer.forEach((walletContainer) => {
      walletContainer.appendChild(repitedWalletElementText);
    });
  });
}
