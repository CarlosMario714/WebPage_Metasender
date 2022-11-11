import { ercABI } from "./resume.js";
const errorAlert = document.querySelector(".errorsAlert");
const connectedToMainet = document.querySelector(".connectedToWeb3Netwrok");
const selectChainItem = document.querySelector(".option-red select");
const tokenInput = document.getElementById("token-input");
const fileTokenInput = document.querySelector(".token-input-file");

export function removeClass(items, className) {
  for (const item of items) item.classList.remove(className);
}

export function addClass(items, className) {
  for (const item of items) item.classList.add(className);
}

export async function getTokenSymbol(_address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const contract = new ethers.Contract(_address, ercABI, provider);

  return await contract.symbol();
}

export function handleError(error) {
  if (error.message) showErrorAlert(error.message);
  else showErrorAlert(error.error.message);
}

export function showConnectAlert() {
  connectedToMainet.classList.add("showAlert");
  connectedToMainet.style.zIndex = 50;

  setTimeout(() => {
    connectedToMainet.classList.remove("showAlert");
    connectedToMainet.style.zIndex = 0;
  }, 5000);
}

export function showErrorAlert(msg) {
  errorAlert.children[1].innerHTML = msg;

  errorAlert.classList.add("showAlert");
}
