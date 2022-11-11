import { login, isConnected } from "./connectWallet.js";
import { finalData } from "./finalData.js";
import { verifyFileData, showWallets } from "./manualWallets.js";
import { showErrorAlert } from "./tools.js";
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
let fileLoader = false;
let tokenToSendFile = "eth";
let walletsFileArr = [];
let amountFileArr = [];
let file;

button.addEventListener("click", () => {
  input.click();
});

optionFile.addEventListener("click", () => {
  if (isConnected) {
    fileDataContainer.style.display = "flex";
    manualDataContainer.style.display = "none";
  } else login();
});

//detecta cada vez que input cambia, osea cada vez que se sube un archivo
input.addEventListener("change", (e) => {
  e.preventDefault();
  file = e.target.files[0];

  showFile(file);

  dropArea.classList.add("active");
  dropArea.classList.remove("active");
});

//elementos que se estan arrastrando encima del area
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "suelta para subir los archivos";
});

//elementos que se estan arrastrando pero fuera del area
dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");
  dragText.textContent = "arrastra y suelta el archivo ";
});

//cuando de suelta un elemento en el area
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  file = e.dataTransfer.files[0];

  showFile(file);

  dropArea.classList.remove("active");
  dragText.textContent = "arrastra y suelta el archivo ";
  continueBtnFile.style.display = "block";
});

tokenInputFile.addEventListener("change", (e) => {
  console.log(e.target.value);
});

function showFile(file) {
  const previewElement = document.createElement("div");
  previewElement.classList.add("file-container");
  previewElement.innerHTML = `<img src="../img/icons/excel-icon.png" alt="${file.name}" width="50">
  <div class="status">
    <span>${file.name}</span>
    <span class="status-text">
      Loading...
    </span>
  </div>`;
  dropArea.removeChild(child1DropArea);
  dropArea.removeChild(child2DropArea);
  dropArea.removeChild(button);
  dropArea.append(previewElement);
}

function ableContinueButton() {
  continueBtnFile.style.display = "block";
}

continueBtnFile.addEventListener("click", processFile);

async function processFile() {
  const data = await file.arrayBuffer();
  ableContinueButton();
  const workbook = XLSX.readFile(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const excelData = XLSX.utils.sheet_to_json(worksheet);

  let confirmData = Object.keys(excelData[0]);

  if (confirmData[0] === "address_to_send" && confirmData[1] === "amount") {
    for (const wallet of excelData) {
      wallet.address_to_send = wallet.address_to_send.trim();
      wallet.amount = wallet.amount.toString().trim();
      wallet.amount = Number(wallet.amount);
      verifyFileData(
        wallet.address_to_send,
        wallet.amount,
        tokenInputFile.value
      );
    }

    showWallets();

    fileDataContainer.style.display = "none";
    manualDataContainer.style.display = "flex";
  } else {
    showErrorAlert("Archivo no valido. descarga la plantilla");
  }
}

export { walletsFileArr, amountFileArr, tokenToSendFile };
