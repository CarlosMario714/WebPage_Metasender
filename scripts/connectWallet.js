import { handleError, removeClass, showErrorAlert, showConnectAlert } from "./tools.js";
import ethChains from "./ethereumchains.js"
const selectChainItem = document.querySelector('.option-red select')
const closeAlert = document.querySelectorAll(".closeAlert");
const alertText = document.querySelector(".alert-text");
const btnConnect = document.querySelector(".btnConnect");
const installAlert = document.querySelector(".installAlert");
const connectedToMainet = document.querySelector(".connectedToWeb3Netwrok");
const disConnectedToMainet = document.querySelector(".disConnectedToMainet");
const errorAlert = document.querySelector(".errorsAlert");
const optinonRed = document.querySelector(".option-red select");
const optionChainCurrency = document.querySelector(
  'option[name="chain-currency"]'
);
const optionChainCurrencyFile = document.querySelector(
  'option[name="chain-currency-file"]'
);
//change
const chain = "0x5";
let isConnected = false;

function setWalletAddress() {
  let start = ethereum.selectedAddress.match(/^\w{5}/);
  let end = ethereum.selectedAddress.match(/\w{4}$/);
  return start + "..." + end;
}

function listenChain() {

  ethereum.on("chainChanged", (chainId) => {

    if ( ethChains[ chainId.slice(2) ] ) {

      selectChainItem.value = chainId.slice(2)

      showConnectAlert()

    }

    else  showErrorAlert('Network Not Suported')

  });

}

// Connect with a ethereum account ( only compatible with metamask )

async function connectWallet() {

  await window.ethereum
    .request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    })
    .then(() => {
      btnConnect.innerHTML = setWalletAddress();
      isConnected = true
      listenChain();
    })
    .catch((x) => {
      console.log(x.message);
    });

}

// it change the chain to Ethereum main net

async function addChain( chain ) {

	return await window.ethereum.request({

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
            rpcUrls: [ ethChains[chain].jsonRPC ],
            blockExplorerUrls: [ ethChains[chain].blockExplorer ],
          },
        ],
    }).catch(error => console.log(error));

}

async function changeChain( chain ) {

	await window.ethereum.request({
		method: "wallet_switchEthereumChain",
		params: [ { chainId: "0x" + chain } ],
	})
	.catch((error) => {
		if(error.code == 4902){
			addChain( chain )
		}

    else handleError( error )
	});

}

function setChain(e) {

  changeChain(e.target.value);

}

// calls connectWallet() and changeChain()

async function login() {
  if (window.ethereum) {
    connectWallet();

    changeChain(5);
  } else {
    installAlert.classList.add("showAlert");
  }
}

// set function to the buttons

btnConnect.addEventListener("click", () => {
  if (!isConnected) {
    login();
  }
});

//close alerts

closeAlert.forEach((alert) => {
  alert.addEventListener("click", function () {
    removeClass(
      [connectedToMainet, disConnectedToMainet, installAlert, errorAlert],
      "showAlert"
    );
  });
});

//select chain
optinonRed.addEventListener("click", setChain);

export { chain, installAlert, disConnectedToMainet, isConnected, login };
