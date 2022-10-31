const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
const body = document.querySelector("body");
let tokenToSendFile = "ETH";
let walletsFileArr = [];
let amountFileArr = [];
let files;

button.addEventListener("click", () => {
  input.click();
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

  const filePreview = `
      <div id="1" class="file-container">
        <img src="../img/icons/unnamed.png" alt="${file.name}" width="50">
        <div class="status">
          <span>${file.name}</span>
          <span class="status-text">
            Loading...
          </span>
        </div>
      </div>`;
  let csv = XLSX.utils.sheet_to_csv(worksheet);
  const html = document.querySelector("#preview").innerHTML;
  document.querySelector("#preview").innerHTML = filePreview;
  for (const adress of excelData) {
    walletsFileArr.push(adress.address);
    amountFileArr.push(adress.amount);
  }
}

export { walletsFileArr, amountFileArr, tokenToSendFile };
