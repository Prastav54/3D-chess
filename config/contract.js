const { ethers } = require("ethers");
const { LLG_CONTRACT_ADDRESS } = require("../constants/contracts/address");
const contractABI = require("../constants/contracts/abi.json");

const BNB_CHAIN_RPC_URL = "https://bsc-dataseed.binance.org/";

const provider = new ethers.providers.JsonRpcBatchProvider(BNB_CHAIN_RPC_URL);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(LLG_CONTRACT_ADDRESS, contractABI, wallet);

module.exports = {
  contract,
};
