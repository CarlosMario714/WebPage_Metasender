import {
  handleError,
  removeClass,
  showErrorAlert,
  showConnectAlert,
  changeTokenItems,
  handlePalco,
} from "./tools.js";
import ethChains from "./ethereumchains.js";
const btnConnect = document.querySelector(".btnConnect");
const installAlert = document.querySelector(".installAlert");
export let isConnected = false;

function setWalletAddress() {
  let isPalco = `<div class="isPalco">PALCO MEMBER</div>`;
  let start = ethereum.selectedAddress.match(/^\w{5}/);
  let end = ethereum.selectedAddress.match(/\w{4}$/);
  return start + "..." + end + isPalco;
}

function listenChain() {
  ethereum.on("chainChanged", async (chainId) => {
    if (ethChains[chainId.slice(2)]) {
      changeTokenItems(chainId);

      await handlePalco();

      showConnectAlert();
    } else showErrorAlert("Network Not Supported");
  });
}

// Connect with a ethereum account ( only compatible with metamask )

async function connectWallet() {
  await window.ethereum
    .request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    })
    .then(async () => {
      btnConnect.innerHTML = setWalletAddress();
      isConnected = true;
      listenChain();
      await handlePalco();
    })
    .catch(handleError);
}

// it change the chain to Ethereum main net

async function addChain(chain) {
  return await window.ethereum
    .request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x" + chain,
          chainName: ethChains[chain].netName,
          nativeCurrency: {
            name: ethChains[chain].symbol,
            symbol: ethChains[chain].symbol,
            decimals: 18,
          },
          rpcUrls: [ethChains[chain].jsonRPC],
          blockExplorerUrls: [ethChains[chain].blockExplorer],
        },
      ],
    })
    .catch(handleError);
}

async function changeChain(chain) {
  await window.ethereum
    .request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + chain }],
    })
    .catch((error) => {
      if (error.code == 4902) addChain(chain);
      else handleError(error);
    });
}

export function setChain(e) {
  changeChain(e.target.value);
}

// calls connectWallet() and changeChain()

export async function login() {
  if (window.ethereum) {
    connectWallet();

    changeChain(5);
  } else {
    installAlert.classList.add("showAlert");
  }
}
