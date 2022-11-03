const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
const body = document.querySelector("body");
const fileDataContainer = document.querySelector(".file-data-container");
const manualDataContainer = document.querySelector(".manual-data-container");
const optionFile = document.querySelector(".option-file");
const optionManual = document.querySelector(".option-manual");
const sendProcessSection = document.getElementById("send-process");
const child1DropArea = document.querySelector(".drop-area h2");
const child2DropArea = document.querySelector(".drop-area span");
const tokenInput = document.getElementById("token-input");

let tokenToSendFile = tokenInput.value;
let walletsFileArr = [];
let amountFileArr = [];
let files;

button.addEventListener("click", () => {
  input.click();
});

optionFile.addEventListener("click", () => {
  fileDataContainer.style.display = "flex";
  manualDataContainer.style.display = "none";
});

//detecta cada vez que input cambia, osea cada vez que se sube un archivo
input.addEventListener("change", (e) => {
  e.preventDefault();
  files = e.target.files[0];
  console.log(files);

  processFile(files);
  dropArea.classList.add("active");
  //showFiles(files);
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
  files = e.dataTransfer.files[0];

  processFile(files);

  //showFiles(files);
  dropArea.classList.remove("active");
  dragText.textContent = "arrastra y suelta el archivo ";
});

async function processFile(file) {
  const data = await file.arrayBuffer();
  const workbook = XLSX.readFile(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const excelData = XLSX.utils.sheet_to_json(worksheet);

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

  for (const adress of excelData) {
    walletsFileArr.push(adress.address);
    amountFileArr.push(adress.amount);
  }
}

export { walletsFileArr, amountFileArr, tokenToSendFile };
