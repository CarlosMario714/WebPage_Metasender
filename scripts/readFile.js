import idioms from "./idioms.js";
import {
  showWallets,
  changeTypeOfToken,
  handleIncorrectWalletClick,
  handleWalletsClicks,
} from "./manualWallets.js";
import {
  handleError,
  showErrorAlert,
  verifyAddress,
  userDeviceInfo,
  deleteBatch,
} from "./tools.js";
import { languaje } from "./translate.js";
import { verifyFileData, verifyRepeatedWalletsFromFile } from "./verify.js";
const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const buttonToUploadFile = dropArea.querySelector("button");
const fileDataContainer = document.querySelector(".file-data-container");
const manualDataContainer = document.querySelector(".manual-data-container");
const dropAreaH2 = document.querySelector(".drop-area h2");
const dropAreaSpan = document.querySelector(".drop-area span");
const tokenInputFile = document.querySelector(".token-input-file");
const continueBtnFile = document.querySelector(".continue-btn-file");
const tokenAddContainerMan = document.querySelectorAll(".token-address")[0];
const tokenAddContainerFile = document.querySelectorAll(".token-address")[1];
const spanContractAddress = document.querySelector(".span-contractaddres-file");
const loaderSendProcess = document.querySelector(".loader-send-process");
const tokenInput = document.getElementById("token-input");
const tokenAddressInputFile = tokenAddContainerFile.children[1];
const tokenAddressInputMan = tokenAddContainerMan.children[1];
const extention = /.xlsx$/;
let fileLoaded = false;
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

export function handleFileContinue() {
  deleteBatch();

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

export async function processFile() {
  return new Promise(async (resolve, reject) => {
    return await file
      .arrayBuffer()
      .then((data) => {
        const workbook = XLSX.readFile(data);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        excelData = XLSX.utils.sheet_to_json(worksheet);

        if (excelData.length > 255)
          return reject(idioms[languaje].alerts.batch_max);

        if (extention.exec(file.name)) {
          fileLoaded = true;

          return resolve();
        }

        return reject(idioms[languaje].alerts.incorrect_file);
      })
      .catch((e) => {
        handleError(e);

        reject(e);
      });
  });
}

export function migrateInfo() {
  loaderSendProcess.classList.toggle("show-loader-send-process");

  //seria mejor que esta funcion devuelva una promesa, por si el archivo no es correcto no pase a la siguiente seccion
  verifyData();

  if (tokenInputFile.value !== "ERC721") {
    verifyRepeatedWalletsFromFile();
  }

  showWallets();

  fileDataContainer.style.display = "none";

  manualDataContainer.style.display = "flex";

  tokenAddressInputMan.value = tokenAddressInputFile.value;

  tokenInput.value = tokenInputFile.value;

  loaderSendProcess.classList.toggle("show-loader-send-process");
}

export function showFile() {
  const previewElement = document.createElement("div");
  previewElement.classList.add("file-container");
  previewElement.innerHTML = `<img src="../img/icons/excel-icon.png" alt="${file.name}" width="50">
  <div class="status">
    <span>${file.name}</span>
    <span class="status-text">
    </span>
  </div>
  <a>
    <img class="delete-file" src="../img/icons/cerrar.png" alt="cerrar pagina" />
  </a>`;
  dropArea.removeChild(dropAreaH2);
  dropArea.removeChild(dropAreaSpan);
  dropArea.removeChild(buttonToUploadFile);
  dropArea.append(previewElement);
}

export function deleteFile() {
  dropArea.removeChild(dropArea.children[1]);

  dropArea.append(dropAreaH2);

  dropArea.append(dropAreaSpan);

  dropArea.append(buttonToUploadFile);

  dropArea.classList.remove("active");
}

export function handleDelete(e) {
  if (e.target.className == "delete-file") deleteFile();
}

async function handleDrop(e) {
  e.preventDefault();

  file = e.dataTransfer.files[0];

  showFile();

  await processFile()
    .then(handleFileContinue)
    .catch((e) => {
      showErrorAlert(e);
      deleteFile();
    });

  dropArea.classList.remove("active");

  dragText.textContent =
    idioms[languaje]["send-process"]["send-process-drop-title"];
}

async function onChangeFile(e) {

  e.preventDefault();
  file = e.target.files[0];

  showFile();

  await processFile()
    .then(handleFileContinue)
    .catch((e) => {
      showErrorAlert(e);
      deleteFile();
    });

  dropArea.classList.add("active");
  dropArea.classList.remove("active");
  
}

export { walletsFileArr, amountFileArr, file, handleDrop, onChangeFile };
