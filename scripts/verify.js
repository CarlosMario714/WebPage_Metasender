import { addIncorrectWalletElement, addOkWalletElement } from "./addWallet.js";
import { verifyAddress } from "./tools.js";
const spanWallet = document.querySelector(".span-wallet");
const spanAmount = document.querySelector(".span-amount");
const walletInput = document.querySelector(".wallet-input");
const amountInput = document.querySelector(".amount-input");

// verify the info of the excel file

export function verifyFileData(wallet, amount, typeOfToken) {

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

// verify the info of the manual wallets

export function verifyManualData(wallet, amount, typeOfToken) {

    const AmountRegex = new RegExp(amountInput.pattern);
  
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