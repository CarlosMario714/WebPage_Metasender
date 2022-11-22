import {
  handleError,
  removeClass,
  showErrorAlert,
  showConnectAlert,
  changeTokenItems,
  handlePalco,
  changeWalletsTokenType,
} from "./tools.js";
import ethChains from "./ethereumchains.js";
const btnConnect = document.querySelector(".btnConnect");
const installAlert = document.querySelector(".installAlert");
const txCostTitle = document.querySelector(
  '[data-type="send-process-resume-txCost"]'
)
export let isConnected = false;

export function setPalcoTexts( palcoMember, txFee ) {

  const start = ethereum.selectedAddress.match(/^\w{5}/);

  const end = ethereum.selectedAddress.match(/\w{4}$/);

  btnConnect.innerHTML = start + "..." + end + palcoMember;

  txCostTitle.innerHTML = txFee
}

function listenChain() {
  ethereum.on("chainChanged", async (chainId) => {
    if (ethChains[chainId]) {
      changeTokenItems(chainId);

      changeWalletsTokenType()

      handlePalco();

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
      handlePalco();
      isConnected = true;
      listenChain();
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
          chainId: chain,
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
      params: [{ chainId: chain }],
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
    await connectWallet();

    //change
    await changeChain('0x5');
  } else {
    installAlert.classList.add("showAlert");
  }
}
