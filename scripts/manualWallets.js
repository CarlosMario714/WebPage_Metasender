const manualData = document.querySelector(".manual-data");
const manualWallet = document.querySelector("manual-wallets");
const addWalletButton = document.querySelector(".add-wallet-button");

const walletInput = document.querySelector(".wallet-input");
const amountInput = document.querySelector(".amount-input");
export let walletsManualArr = [];
export let amountManualArr = [];
let numberOfWallets = 0;

console.log(amountManualArr);

addWalletButton.addEventListener("click", () => {
  addNewManualWallet();
});

function addNewManualWallet() {
  numberOfWallets += 1;
  let newWalletContainer = document.createElement("div");
  newWalletContainer.classList.add("manual-wallets");
  newWalletContainer.innerHTML = `<div class="number-wallet">${numberOfWallets}</div>
  <div class="input-container">
    <label>adress</label>
    <input class="wallet-input" type="text" name="manual-wallet" placeholder="Escribe la wallet" value="${walletInput.value}" readonly />
  </div>
  <div class="input-container">
    <label>monto</label>
    <input class="amount-input" type="text" name="manual-wallet" placeholder="Escribe el monto" value="${amountInput.value}" readonly />
  </div>
  <a class="delete-wallet" data-wallet="${numberOfWallets}">
    <img src="../img/icons/close.svg" alt="cerrar pagina"/>
  </a>`;
  manualData.append(newWalletContainer);
  walletsManualArr.push(walletInput.value);
  amountManualArr.push(amountInput.value);
}

function deleteManualWallet() {}

console.log(walletsManualArr, amountManualArr);
