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
const spanWallet = document.querySelector(".span-wallet");
const spanAmount = document.querySelector(".span-amount");

let walletsManualArr = [];
let amountManualArr = [];
let tokenToSendManual = tokenInput.value;

let numberOfWallets = 0;
let domElementWallet;

//expresion regular numeros positivos enteros ^\d*\d+$
//expresion regular numeros positivos enteros y con decimales ^\d*\.\d+$|^\d*\d+$
tokenInput.addEventListener("click", (e) => {
  switch (tokenInput.value) {
    case "ETH":
      labelAdress.innerHTML = "Cuenta o Wallet a enviar";
      walletInput.placeholder = "Escribe la wallet";
      labelAmount.innerHTML = "Monto a Enviar";
      amountInput.placeholder = "Escribe el monto";
      amountInput.pattern = `^\\d*\\.\\d+$|^\\d*\\d+$`;
      break;
    case "ERC20":
      labelAdress.innerHTML = "Adress del contrato del token";
      walletInput.placeholder = "Escribe el Adress del contrato";
      labelAmount.innerHTML = "Cantidad de tokens a enviar";
      amountInput.placeholder = "Escribe cantidad de tokens";
      amountInput.pattern = `^\\d*\\.\\d+$|^\\d*\\d+$`;
      break;
    case "ERC721":
      labelAdress.innerHTML = "Adress del contrato del token";
      walletInput.placeholder = "Escribe el Adress del contrato";
      labelAmount.innerHTML = "ID del token a enviar";
      amountInput.placeholder = "Escribe el ID del token";
      amountInput.pattern = `^\\d*\\d+$`;
      break;
  }
});

optionManual.addEventListener("click", () => {
  manualDataContainer.style.display = "flex";
  fileDataContainer.style.display = "none";
});

addWalletButton.addEventListener("click", (e) => {
  if (walletInput.value && amountInput.value !== "") {
    let walletRegex = new RegExp(walletInput.pattern);
    let AmountRegex = new RegExp(amountInput.pattern);

    !walletRegex.exec(walletInput.value)
      ? spanWallet.classList.add("is-active")
      : spanWallet.classList.remove("is-active");

    !AmountRegex.exec(amountInput.value)
      ? spanAmount.classList.add("is-active")
      : spanAmount.classList.remove("is-active");

    // console.log(
    //   walletRegex.exec(walletInput.value) && AmountRegex.exec(amountInput.value)
    // );

    if (
      walletRegex.exec(walletInput.value) &&
      AmountRegex.exec(amountInput.value)
    ) {
      addNewManualWallet();
      continueBtnManual.classList.add("opacity");
      console.log(amountInput.pattern);
    }
  }
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
  newWalletContainer.innerHTML = `
  <div class="manual-wallet">
    <div>${numberOfWallets}</div>
    <div>${walletInput.value}</div>
    <div>${amountInput.value}</div>
    <div>${tokenInput.value}</div>
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
