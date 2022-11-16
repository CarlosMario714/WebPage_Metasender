import { login, isConnected } from "./connectWallet.js";
import { finalData } from "./finalData.js";
import {
  verifyFileData,
  showWallets,
  changeTypeOfToken,
} from "./manualWallets.js";
import {
  handleError,
  showErrorAlert,
  verifyAddress,
  userDeviceInfo,
} from "./tools.js";
const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
const fileDataContainer = document.querySelector(".file-data-container");
const manualDataContainer = document.querySelector(".manual-data-container");
const optionFile = document.querySelector(".option-file");
const child1DropArea = document.querySelector(".drop-area h2");
const child2DropArea = document.querySelector(".drop-area span");
const tokenInputFile = document.querySelector(".token-input-file");
const continueBtnFile = document.querySelector(".continue-btn-file");
const tokenAddContainerMan = document.querySelectorAll(".token-address")[0];
const tokenAddContainerFile = document.querySelectorAll(".token-address")[1];
const spanContractAddress = document.querySelector(".span-contractaddres-file");
const loaderSendProcess = document.querySelector(".loader-send-process");
const tokenInput = document.getElementById("token-input");
const tokenAddressInputFile = tokenAddContainerFile.children[1];
const tokenAddressInputMan = tokenAddContainerMan.children[1];
let fileLoaded = false;
let tokenToSendFile = "eth";
let walletsFileArr = [];
let amountFileArr = [];
let file;
let excelData;

function ableContinueButton() {
  continueBtnFile.style.display = "block";
}

function disableContinueButton() {
  continueBtnFile.style.display = "none";

  spanContractAddress.classList.add("is-active");

  setTimeout(() => {
    spanContractAddress.classList.remove("is-active");
  }, 3000);
}

function handleContract() {
  tokenAddContainerFile.style.display = "block";

  if (verifyAddress(tokenAddressInputFile.value) && fileLoaded)
    ableContinueButton();
  else disableContinueButton();
}

function handleContinue() {
  changeTypeOfToken(tokenInputFile.value);

  if (tokenInputFile.value !== "") {
    if (tokenInputFile.value == "ETH") {
      tokenAddContainerFile.style.display = "none";

      if (fileLoaded) ableContinueButton();
    } else handleContract();
  }
}

function verifyData() {
  const confirmData = Object.keys(excelData[0]);

  if (confirmData[0] === "address" && confirmData[1] === "amount") {
    for (const wallet of excelData) {
      wallet.address = wallet.address.trim();
      wallet.amount = wallet.amount.toString().trim();
      wallet.amount = Number(wallet.amount);
      verifyFileData(wallet.address, wallet.amount, tokenInputFile.value);
    }
  } else {
    showErrorAlert("Invalid file. download the template");
  }
}

async function processFile() {
  return await file
    .arrayBuffer()
    .then((data) => {
      fileLoaded = true;

      const workbook = XLSX.readFile(data);

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      excelData = XLSX.utils.sheet_to_json(worksheet);
    })
    .catch(handleError);
}

function migrateInfo() {
  loaderSendProcess.classList.toggle("show-loader-send-process");

  verifyData();

  showWallets();

  fileDataContainer.style.display = "none";

  manualDataContainer.style.display = "flex";

  tokenAddressInputMan.value = tokenAddressInputFile.value;

  tokenInput.value = tokenInputFile.value;

  loaderSendProcess.classList.toggle("show-loader-send-process");
}

function showFile(file) {
  const previewElement = document.createElement("div");
  previewElement.classList.add("file-container");
  previewElement.innerHTML = `<img src="../img/icons/excel-icon.png" alt="${file.name}" width="50">
  <div class="status">
    <span>${file.name}</span>
    <span class="status-text">
    </span>
  </div>`;
  dropArea.removeChild(child1DropArea);
  dropArea.removeChild(child2DropArea);
  dropArea.removeChild(button);
  dropArea.append(previewElement);
}

button.addEventListener("click", () => {
  input.click();
});

optionFile.addEventListener("click", () => {
  let userInfo = userDeviceInfo();
  if (userInfo.mobile) return showErrorAlert("Not available on movil devices");
  if (isConnected) {
    fileDataContainer.style.display = "flex";
    manualDataContainer.style.display = "none";
  } else login();
});

//detecta cada vez que input cambia, osea cada vez que se sube un archivo
input.addEventListener("change", async (e) => {
  e.preventDefault();
  file = e.target.files[0];

  showFile(file);

  await processFile().then(handleContinue);

  dropArea.classList.add("active");
  dropArea.classList.remove("active");
});

//elementos que se estan arrastrando encima del area
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to upload files";
});

//elementos que se estan arrastrando pero fuera del area
dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");
  dragText.textContent = "drag and drop the file ";
});

//cuando de suelta un elemento en el area
dropArea.addEventListener("drop", async (e) => {
  e.preventDefault();
  file = e.dataTransfer.files[0];

  showFile(file);

  await processFile().then(handleContinue);

  dropArea.classList.remove("active");

  dragText.textContent = "drag and drop the file ";
});

tokenInputFile.addEventListener("change", () => {
  handleContinue();
});

tokenAddressInputFile.addEventListener("input", () => {
  handleContinue();
});

tokenAddressInputFile.addEventListener("change", handleContinue);

continueBtnFile.addEventListener("click", migrateInfo);

export { walletsFileArr, amountFileArr, tokenToSendFile };
