import { login, isConnected } from "./connectWallet.js";
import { finalData } from "./finalData.js";
import { verifyFileData, showWallets } from "./manualWallets.js";
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
});

tokenInputFile.addEventListener("change", () => {
  continueBtnFile.style.display = "block";
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

continueBtnFile.addEventListener("click", processFile);

async function processFile() {
  const data = await file.arrayBuffer();
  const workbook = XLSX.readFile(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const excelData = XLSX.utils.sheet_to_json(worksheet);
  //console.log(excelData);

  for (const wallet of excelData) {
    verifyFileData(wallet.address, wallet.amount, tokenInputFile.value);
    //walletsFileArr.push(adress.address);
    //amountFileArr.push(adress.amount);
  }

  //console.log(finalData);

  showWallets();

  fileDataContainer.style.display = "none";
  manualDataContainer.style.display = "flex";
}

export { walletsFileArr, amountFileArr, tokenToSendFile };
