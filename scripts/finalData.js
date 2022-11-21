import { getDecimals } from "./resume.js";
const finalData = {
  tokenToSend: "ETH",
  tokenAddress: "",
  wallets: [],
  amount: [],
  repeated: [],
  numAddresses: 0,
  totalToSend: 0,
  txCost: 0,
  userETHBalance: 0,
  userTokenBalance: 0,
  tokensToAprove: 0,
  isPalco: false,
  decimals: 18
};
const tokenInput = document.getElementById("token-input");
const tokenAddContainerMan = document.querySelectorAll(".token-address")[0];
const tokenAddressInputMan = tokenAddContainerMan.children[1];

async function setFinalData(walletsArr, amountArr) {
  finalData.tokenToSend = tokenInput.value;

  finalData.wallets = walletsArr;

  finalData.tokenAddress = tokenAddressInputMan.value;

  if (tokenInput.value == "ERC20" ) finalData.decimals = await getDecimals()

  else finalData.decimals = 18

  tokenInput.value == "ERC721"
    ? (finalData.amount = amountArr.map((amount) => Number(amount)))
    : (finalData.amount = amountArr.map((amount) =>
        ethers.utils.parseUnits( `${amount}`, finalData.decimals)
      ));
      
}

export { finalData, setFinalData };
