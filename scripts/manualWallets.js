const manualWalletsContainer = document.querySelector(
  ".manual-wallets-container"
);
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

manualWalletsContainer.addEventListener("click", (e) => {
  if (e.target.classList == "delete-wallet") {
    deleteManualWallet(e.target.dataset.wallet);
  }
});

function addNewManualWallet() {
  numberOfWallets += 1;
  let newWalletContainer = document.createElement("div");
  newWalletContainer.classList.add(
    `wallet-${numberOfWallets}-adress`,
    "manual-wallets"
  );
  newWalletContainer.innerHTML = `<div class="manual-wallet">
  <div>${numberOfWallets}</div>
  <div class="wallet-1-adress">${walletInput.value}</div>
  <div class="wallet-1-amount">${amountInput.value} ETH</div>
  <a>
    <img class="delete-wallet" data-wallet="${numberOfWallets}" src="../img/icons/close.svg"
      alt="cerrar pagina" />
  </a>
</div>`;
  manualWalletsContainer.append(newWalletContainer);
  walletsManualArr.push(walletInput.value);
  amountManualArr.push(amountInput.value);
  domElementWallet = document.querySelectorAll(".manual-wallets");
}

function deleteManualWallet(walletToDelete) {
  domElementWallet.forEach((element) => {
    if (element.classList[0] === `wallet-${walletToDelete}-adress`) {
      manualWalletsContainer.removeChild(element);
    }
  });
}

export { walletsManualArr, amountManualArr, tokenToSendManual };
