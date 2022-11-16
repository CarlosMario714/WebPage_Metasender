import { handleError, removeClass, showErrorAlert, showConnectAlert, changeTokenItems } from "./tools.js";
import ethChains from "./ethereumchains.js"
const closeAlert = document.querySelectorAll(".closeAlert");
const btnConnect = document.querySelector(".btnConnect");
const installAlert = document.querySelector(".installAlert");
const connectedToMainet = document.querySelector(".connectedToWeb3Netwrok");
const errorAlert = document.querySelector(".errorsAlert");
const optinonRed = document.querySelector(".option-red select");
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

      changeTokenItems( chainId )

      showConnectAlert()

    }

    else  showErrorAlert('Network Not Supported')

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
    .catch( handleError );

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
    }).catch( handleError );

}

async function changeChain( chain ) {

	await window.ethereum.request({
		method: "wallet_switchEthereumChain",
		params: [ { chainId: "0x" + chain } ],
	})
	.catch((error) => {

		if(error.code == 4902) addChain( chain )

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
      [connectedToMainet, installAlert, errorAlert],
      "showAlert"
    );
  });
});

//select chain
optinonRed.addEventListener("click", setChain);

export { chain, installAlert, isConnected, login };
