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
const resumenFinalContainer = document.querySelector(
  ".resumen-final-container"
);
const atrasbtn = document.querySelector(".atras-btn");
//resumen operacion
const totalWallets = document.querySelector(".total-wallets");
const totalTokens = document.querySelector(".total-tokens");
const balanceTokens = document.querySelector(".balance-tokens");
const balanceEth = document.querySelector(".balance-eth");
const costoOperacion = document.querySelector(".costo-operacion");

let walletsManualArr = [];
let amountManualArr = [];
let tokenToSendManual = tokenInput.value;

let numberOfNewWallet = 0;

optionManual.addEventListener("click", () => {
  manualDataContainer.style.display = "flex";
  fileDataContainer.style.display = "none";
  resumenFinalContainer.style.display = "none";
});

//select type of token
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

//verify data and add new wallet
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
      walletInput.value = "";
      amountInput.value = "";
      continueBtnManual.classList.add("opacity");
    }
  }
});

//delete wallet
manualWalletsContainer.addEventListener("click", (e) => {
  if (e.target.classList[0] == "delete-wallet") {
    manualWalletsContainer.removeChild(e.target.parentNode.parentNode);
    renameNumberOfWallets();
  }
  if (e.target.classList[0] == "edit-wallet") {
    let parentElement = e.target.parentNode.parentNode;
    //console.log(parentElement.childNodes);
    parentElement.childNodes.forEach((element) => {
      if (element.classList == "wallet-adress") {
        walletInput.value = element.innerHTML;
      }
      if (element.classList == "wallet-amount") {
        amountInput.value = element.innerHTML;
      }
    });
    walletInput.classList.add("edit");
    amountInput.classList.add("edit");
    setTimeout(() => {
      walletInput.classList.remove("edit");
      amountInput.classList.remove("edit");
    }, 1000);
    manualWalletsContainer.removeChild(parentElement);
    renameNumberOfWallets();
  }
});

//rename wallets when someone is delete
function renameNumberOfWallets() {
  let numberOfWallet = document.querySelectorAll(".number-of-wallet");
  console.log("number of wallets", numberOfWallet);

  for (let i = 0; i < numberOfWallet.length; i++) {
    console.log(i);
    console.log("number of wallets length", numberOfWallet.length);
    numberOfWallet[i].parentNode.id = i + 1;
    numberOfWallet[i].innerHTML = i + 1;
    numberOfNewWallet = i + 1;
  }
}

//add new wallet element
function addNewManualWallet() {
  numberOfNewWallet += 1;
  let newWalletContainer = document.createElement("div");
  newWalletContainer.id = numberOfNewWallet;
  newWalletContainer.classList.add("manual-wallet");
  newWalletContainer.innerHTML = `
    <div class="number-of-wallet">${numberOfNewWallet}</div>
    <div class="wallet-adress">${walletInput.value}</div>
    <div class="wallet-amount">${amountInput.value}</div>
    <div>${tokenInput.value}</div>
    <a>
      <img class="edit-wallet" src="../img/icons/boton-editar.png"
        alt="cerrar pagina" />
    </a>
    <a>
      <img class="delete-wallet" src="../img/icons/cerrar.png"
        alt="cerrar pagina" />
    </a>`;
  manualWalletsContainer.append(newWalletContainer);
  //walletsManualArr.push(walletInput.value);
  //amountManualArr.push(amountInput.value);
}

continueBtnManual.addEventListener("click", () => {
  walletsManualArr = [];
  amountManualArr = [];
  let walletAdress = document.querySelectorAll(".wallet-adress");
  let walletMount = document.querySelectorAll(".wallet-amount");

  walletAdress.forEach((walletAddres) => {
    walletsManualArr.push(walletAddres.innerHTML);
  });

  walletMount.forEach((walletMount) => {
    amountManualArr.push(walletMount.innerHTML);
  });

  setFinalResume();

  manualDataContainer.style.display = "none";
  resumenFinalContainer.style.display = "block";

  console.log(walletsManualArr);
  console.log(amountManualArr);
});

function setFinalResume() {
  totalWallets.innerHTML = walletsManualArr.length;
}

atrasbtn.addEventListener("click", () => {
  manualDataContainer.style.display = "flex";
  resumenFinalContainer.style.display = "none";
});

export { walletsManualArr, amountManualArr, tokenToSendManual };
