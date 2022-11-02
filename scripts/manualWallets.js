const manualWalletsContainer = document.querySelector(
  ".manual-wallets-container"
);
const addWalletButton = document.querySelector(".add-wallet-button");
const walletInput = document.querySelector(".wallet-input");
const amountInput = document.querySelector(".amount-input");
const optionManual = document.querySelector(".option-manual");
const optionFile = document.querySelector(".option-file");
const manualDataContainer = document.querySelector(".manual-data-container");
const fileDataContainer = document.querySelector(".file-data-container");
const continueBtnManual = document.querySelector(".continue-btn-manual");
const sendProcessSection = document.getElementById("send-process");
const tokenInput = document.getElementById("token-input");
const labelAdress = document.querySelector(".label-adress");
const labelAmount = document.querySelector(".label-amount");

let walletsManualArr = [];
let amountManualArr = [];
let tokenToSendManual = tokenInput.value;

let numberOfWallets = 0;
let domElementWallet;

tokenInput.addEventListener("click", (e) => {
  switch (tokenInput.value) {
    case "ETH":
      labelAdress.innerHTML = "Cuenta o Wallet a enviar";
      walletInput.placeholder = "Escribe la wallet";
      labelAmount.innerHTML = "Monto a Enviar";
      labelAmount.placeholder = "Escribe el monto";
      break;
    case "ERC20":
      labelAdress.innerHTML = "Adress del contrato del token";
      walletInput.placeholder = "Escribe el Adress del contrato";
      labelAmount.innerHTML = "# de tokens a enviar";
      labelAmount.placeholder = "Escribe el # de tokens";
    case "ERC721":
      labelAdress.innerHTML = "Adress del contrato del token";
      walletInput.placeholder = "Escribe el Adress del contrato";
      labelAmount.innerHTML = "# de tokens a enviar";
      labelAmount.placeholder = "Escribe el # de tokens";
  }
});

optionManual.addEventListener("click", () => {
  manualDataContainer.style.display = "flex";
  fileDataContainer.style.display = "none";
});

addWalletButton.addEventListener("click", () => {
  addNewManualWallet();
  continueBtnManual.classList.add("opacity");
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
