import { walletsFileArr, amountFileArr, tokenToSendFile } from "./readFile.js";
import {
  walletsManualArr,
  amountManualArr,
  tokenToSendManual,
} from "./manualWallets.js";
const finalData = {
  tokenToSend: "ETH",
  tokenAddress: "",
  wallets: [],
  amount: [],
  numAddresses: 0,
  totalToSend: 0,
  txCost: 0,
  userETHBalance: 0,
  userTokenBalance: 0,
};
const btnProcessManual = document.querySelector(".continue-btn-manual");
const btnProcessFile = document.querySelector(".continue-btn-file");

// btnProcessManual.addEventListener("click", () => {
//   processFinalData();
// });

// btnProcessFile.addEventListener("click", () => {
//   processFinalData();
// });

function processFinalData() {
  if (walletsFileArr.length != 0 && amountFileArr.length != 0) {
    setFinalData(walletsFileArr, amountFileArr, tokenToSendFile);
  } else if (walletsManualArr.length != 0 && amountManualArr.length != 0) {
    setFinalData(walletsManualArr, amountManualArr, tokenToSendManual);
  }
}

function setFinalData(walletsArr, amountArr, tokenToSend) {
  //console.log(typeof amountArr[0]);
  finalData.tokenToSend = tokenToSend;
  finalData.wallets = [...walletsArr];
  let amountInBigNumber = amountArr.map((amount) =>
    ethers.utils.parseEther(amount.toString())
  );
  finalData.amount = amountInBigNumber;
}

export { finalData, processFinalData };
