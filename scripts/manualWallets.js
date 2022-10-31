const manualData = document.querySelector(".manual-data");
const manualWallet = document.querySelector("manual-wallets");
const addWalletButton = document.querySelector(".add-wallet-button");
const walletInput = document.querySelector(".wallet-input");
const amountInput = document.querySelector(".amount-input");
let walletsManualArr = [];
let amountManualArr = [];
let tokenToSendManual = "ETH";
let numberOfWallets = 0;
let domElementWallet;

addWalletButton.addEventListener("click", () => {
  addNewManualWallet();
});

manualData.addEventListener("click", (e) => {
  if (e.target.classList == "delete-wallet") {
    deleteManualWallet(e.target.dataset.wallet);
  }
});

function addNewManualWallet() {
  numberOfWallets += 1;
  let newWalletContainer = document.createElement("div");
  newWalletContainer.classList.add(
    `wallet-#-${numberOfWallets}`,
    "manual-wallets"
  );
  newWalletContainer.innerHTML = `<div class="number-wallet">${numberOfWallets}</div>
  <div class="input-container">
    <label>adress</label>
    <input class="wallet-input" type="text" name="manual-wallet" placeholder="Escribe la wallet" value="${walletInput.value}" readonly />
  </div>
  <div class="input-container">
    <label>monto</label>
    <input class="amount-input" type="text" name="manual-wallet" placeholder="Escribe el monto" value="${amountInput.value}" readonly />
  </div>
  <a >
    <img class="delete-wallet" data-wallet="${numberOfWallets}" src="../img/icons/close.svg" alt="cerrar pagina"/>
  </a>`;
  manualData.append(newWalletContainer);
  walletsManualArr.push(walletInput.value);
  //let mount = ethers.utils.parseEther(amountInput.value)._hex;
  amountManualArr.push(amountInput.value);
  domElementWallet = document.querySelectorAll(".manual-wallets");
}

function deleteManualWallet(walletToDelete) {
  domElementWallet.forEach((element) => {
    if (element.classList[0] === `wallet-#-${walletToDelete}`) {
      manualData.removeChild(element);
    }
  });
}

export { walletsManualArr, amountManualArr, tokenToSendManual };
