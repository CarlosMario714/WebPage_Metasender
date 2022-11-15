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
const tokenInput = document.getElementById("token-input");
const tokenAddContainerMan = document.querySelectorAll(".token-address")[0];
const tokenAddressInputMan = tokenAddContainerMan.children[1];

function setFinalData(walletsArr, amountArr) {
  finalData.tokenToSend = tokenInput.value;

  finalData.wallets = walletsArr;

  tokenInput.value == "ERC721"
    ? (finalData.amount = amountArr.map((amount) => Number(amount)))
    : (finalData.amount = amountArr.map((amount) =>
        ethers.utils.parseEther(amount.toString())
      ));

  finalData.tokenAddress = tokenAddressInputMan.value;
}

export { finalData, setFinalData };
