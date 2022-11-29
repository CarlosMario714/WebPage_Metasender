import metasender from "./contracts/metasender.js";
import { finalData } from "./finalData.js";
import ethChains from "./ethereumchains.js";
import {
  getContract,
  handleError,
  handlePalco,
  handleTxFee,
  showInstallAlert,
} from "./tools.js";
import { isConnected, login } from "./connectWallet.js";
const blockExplorerLinkItem = document.querySelector(".blockExplorerLink");

export function getTotalValue(valuesArray) {
  return valuesArray.reduce((prev, curr) => prev.add(curr));
}

export function isSameValue(values) {
  const isSame = values.every(
    (prev) => prev.toString() == values[0].toString()
  );

  if (isSame) return "Same";

  return "Different";
}

async function sendNativeTokenSameValue(addresses, amounts) {
  const contract = getContract(
    metasender[`address_${ethereum.chainId}`],
    metasender.abi
  );

  const txFee = await handleTxFee();

  return await contract
    .sendNativeTokenSameValue(addresses, amounts[0], {
      value: getTotalValue(amounts).add(txFee),
    })
    .catch(handleError);
}

async function sendNativeTokenDifferentValue(addresses, amounts) {
  const contract = getContract(
    metasender[`address_${ethereum.chainId}`],
    metasender.abi
  );

  const txFee = await handleTxFee();

  return await contract
    .sendNativeTokenDifferentValue(addresses, amounts, {
      value: getTotalValue(amounts).add(txFee),
    })
    .catch(handleError);
}

async function sendERC20SameValue(contactAdd, addresses, amounts) {
  const contract = getContract(
    metasender[`address_${ethereum.chainId}`],
    metasender.abi
  );

  const txFee = await handleTxFee();

  return await contract
    .sendERC20SameValue(contactAdd, addresses, amounts[0], { value: txFee })
    .catch(handleError);
}

async function sendERC20DifferentValue(contactAdd, addresses, amounts) {
  const contract = getContract(
    metasender[`address_${ethereum.chainId}`],
    metasender.abi
  );

  const txFee = await handleTxFee();

  return await contract
    .sendERC20DifferentValue(contactAdd, addresses, amounts, { value: txFee })
    .catch(handleError);
}

async function sendERC721(contactAdd, addresses, tokenIds) {
  const contract = getContract(
    metasender[`address_${ethereum.chainId}`],
    metasender.abi
  );

  const txFee = await handleTxFee();

  return await contract
    .sendERC721(contactAdd, addresses, tokenIds, { value: txFee })
    .catch(handleError);
}

async function addToPALCO() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    metasender[`address_${ethereum.chainId}`],
    metasender.abi,
    signer
  );

  const PALCOFee = await contract.PALCOPass();

  return await contract
    .addToPALCO(ethereum.selectedAddress, { value: PALCOFee })
    .catch(handleError);
}

export async function buyPalcoPass() {
  showInstallAlert();

  if (isConnected) {
    await addToPALCO().then(async (tx) => {
      await tx.wait();

      await handlePalco();
    });
  } else login();
}
class MetasenderMethods {
  constructor() {
    this.sendNativeTokenDifferentValue = sendNativeTokenDifferentValue;
    this.sendNativeTokenSameValue = sendNativeTokenSameValue;
    this.sendERC20DifferentValue = sendERC20DifferentValue;
    this.sendERC20SameValue = sendERC20SameValue;
    this.sendERC721 = sendERC721
  }
}

export const metasenderFunctions = new MetasenderMethods();

export async function sendTransaction() {
  switch (finalData.tokenToSend) {
    case "ETH":
      return await metasenderFunctions[
        `sendNativeToken${isSameValue(finalData.amount)}Value`
      ](finalData.wallets, finalData.amount);

    case "ERC20":
      return await metasenderFunctions[
        `sendERC20${isSameValue(finalData.amount)}Value`
      ](finalData.tokenAddress, finalData.wallets, finalData.amount);

    case "ERC721":
      return await metasenderFunctions.sendERC721(
        finalData.tokenAddress,
        finalData.wallets,
        finalData.amount
      );
  }
}

export async function handleSend() {
  await sendTransaction().then((tx) => {
    const chainId = ethereum.chainId;

    blockExplorerLinkItem.href = `${ethChains[chainId].blockExplorer}/tx/${tx.hash}`;

    blockExplorerLinkItem.style.display = "block";
  });
}
