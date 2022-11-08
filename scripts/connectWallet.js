import { addClass, removeClass } from "./tools.js";
const closeAlert = document.querySelectorAll(".closeAlert");
const alertText = document.querySelector(".alert-text");
const btnConnect = document.querySelector(".btnConnect");
const installAlert = document.querySelector(".installAlert");
const connectedToMainet = document.querySelector(".connectedToMainet");
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
    if (chainId === chain) {
      disConnectedToMainet.classList.remove("showAlert");
      connectedToMainet.classList.add("showAlert");
      connectedToMainet.style.zIndex = 50;

      setTimeout(() => {
        connectedToMainet.classList.remove("showAlert");
        connectedToMainet.style.zIndex = 0;
      }, 5000);
    } else {
      disConnectedToMainet.classList.add("showAlert");
    }
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
      listenChain();
    })
    .catch((x) => {
      console.log(x.message);
    });
}

// it change the chain to Ethereum main net

async function changeChain(chain) {
  switch (chain) {
    case "1":
      optinonRed.style.width = "220px";
      optionChainCurrency.innerHTML = "ETH";
      optionChainCurrency.value = "ETH";
      optionChainCurrencyFile.innerHTML = "ETH";
      optionChainCurrency.value = "ETH";
      return await window.ethereum.request({
        //change
        id: Number(chain),
        jsonrpc: "2.0",
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0x" + chain,
          },
        ],
      });
    case "5":
      optinonRed.style.width = "170px";
      optionChainCurrency.innerHTML = "ETH";
      optionChainCurrency.value = "ETH";
      optionChainCurrencyFile.innerHTML = "ETH";
      optionChainCurrency.value = "ETH";
      return await window.ethereum.request({
        //change
        id: Number(chain),
        jsonrpc: "2.0",
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0x" + chain,
          },
        ],
      });
    case "38":
      optinonRed.style.width = "340px";
      optionChainCurrency.innerHTML = "BNB";
      optionChainCurrency.value = "BNB";
      optionChainCurrencyFile.innerHTML = "BNB";
      optionChainCurrency.value = "BNB";
      return await window.ethereum.request({
        //change
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x" + chain,
            chainName: "Binance Smart Chain Mainnet",
            nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18,
            },
            rpcUrls: ["https://bsc-dataseed1.binance.org"],
            blockExplorerUrls: ["https://bscscan.com"],
          },
        ],
      });
    case "89":
      optinonRed.style.width = "200px";
      optionChainCurrency.innerHTML = "MATIC";
      optionChainCurrency.value = "MATIC";
      optionChainCurrencyFile.innerHTML = "MATIC";
      optionChainCurrency.value = "MATIC";
      return await window.ethereum.request({
        //change
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x" + chain,
            chainName: "Polygon Mainnet",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://polygon-rpc.com"],
            blockExplorerUrls: ["https://polygonscan.com"],
          },
        ],
      });
    case "a86a":
      optinonRed.style.width = "220px";
      optionChainCurrency.innerHTML = "AVAX";
      optionChainCurrency.value = "AVAX";
      optionChainCurrencyFile.innerHTML = "AVAX";
      optionChainCurrency.value = "AVAX";
      return await window.ethereum.request({
        //change
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x" + chain,
            chainName: "Avalanche C-Chain",
            nativeCurrency: {
              name: "AVAX",
              symbol: "AVAX",
              decimals: 18,
            },
            rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
            blockExplorerUrls: ["https://snowtrace.io"],
          },
        ],
      });
    case "fa":
      optinonRed.style.width = "170px";
      optionChainCurrency.innerHTML = "FTM";
      optionChainCurrency.value = "FTM";
      optionChainCurrencyFile.innerHTML = "FTM";
      optionChainCurrency.value = "FTM";
      return await window.ethereum.request({
        //change
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x" + chain,
            chainName: "Fantom Opera",
            nativeCurrency: {
              name: "FTM",
              symbol: "FTM",
              decimals: 18,
            },
            rpcUrls: ["https://rpc.ftm.tools"],
            blockExplorerUrls: ["https://ftmscan.com"],
          },
        ],
      });
    case "3d":
      optinonRed.style.width = "300px";
      optionChainCurrency.innerHTML = "ETC";
      optionChainCurrency.value = "ETC";
      optionChainCurrencyFile.innerHTML = "ETC";
      optionChainCurrency.value = "ETC";
      return await window.ethereum.request({
        //change
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x" + chain,
            chainName: "Ethereum Classic Mainnet",
            nativeCurrency: {
              name: "ETC",
              symbol: "ETC",
              decimals: 18,
            },
            rpcUrls: ["https://www.ethercluster.com/etc"],
            blockExplorerUrls: ["https://blockscout.com/etc/mainnet"],
          },
        ],
      });
  }
}

function setChain(e) {
  console.log(e.target.value);
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

export { chain, installAlert, disConnectedToMainet };
