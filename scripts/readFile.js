import idioms from "./idioms.js";
import {
  showWallets,
  changeTypeOfToken,
} from "./manualWallets.js";
import {
  handleError,
  showErrorAlert,
  verifyAddress,
  userDeviceInfo,
} from "./tools.js";
import { languaje } from "./translate.js";
import { verifyFileData } from "./verify.js";
const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const fileDataContainer = document.querySelector(".file-data-container");
const manualDataContainer = document.querySelector(".manual-data-container");
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
const extention = /.xlsx/
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

  changeTypeOfToken( tokenInputFile.value );

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

  return new Promise( async( resolve, reject ) => {
  
    return await file
      .arrayBuffer()
      .then((data) => {
  
        const workbook = XLSX.readFile(data);
  
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  
        excelData = XLSX.utils.sheet_to_json(worksheet);
  
        if ( excelData.length > 255 ) 
          return reject( idioms[ languaje].alerts.batch_max)

        if ( extention.exec( file.name ) ) {

          fileLoaded = true;

          return resolve()

        }

        return reject( idioms[ languaje ].alerts.incorrect_file)

      })
      .catch((e) => {

        handleError(e)
        
        reject(e)

      });

  })
  
  // return await file
  //   .arrayBuffer()
  //   .then((data) => {
  //     fileLoaded = true;

  //     const workbook = XLSX.readFile(data);

  //     const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  //     excelData = XLSX.utils.sheet_to_json(worksheet);

  //     if( excelData )
  //   })
  //   .catch(handleError);
}

export function migrateInfo() {
  loaderSendProcess.classList.toggle("show-loader-send-process");

  verifyData();

  showWallets();

  fileDataContainer.style.display = "none";

  manualDataContainer.style.display = "flex";

  tokenAddressInputMan.value = tokenAddressInputFile.value;

  tokenInput.value = tokenInputFile.value;

  loaderSendProcess.classList.toggle("show-loader-send-process");
}

export function showFile(file) {
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
  dropArea.removeChild(child1DropArea);
  dropArea.removeChild(child2DropArea);
  dropArea.removeChild(button);
  dropArea.append(previewElement);
}

export function deleteFile(){

    dropArea.removeChild(dropArea.children[1])

    dropArea.append(child1DropArea);

    dropArea.append(child2DropArea);

    dropArea.append(button);

    dropArea.classList.remove('active')

}

export function handleDelete(e) {

  if (e.target.className == "delete-file") deleteFile()

}

async function handleDrop( e ) {
  
  e.preventDefault();

  file = e.dataTransfer.files[0];

  showFile(file);

  await processFile()
    .then(handleFileContinue)
    .catch((e) => {
        showErrorAlert(e)
        deleteFile()
    });

  dropArea.classList.remove("active");

  dragText.textContent = "drag and drop the file ";
  
}

export { walletsFileArr, amountFileArr, file, handleDrop };
