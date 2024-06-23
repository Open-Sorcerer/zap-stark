import {
  fetchQuotes,
  executeSwap,
  QuoteRequest,
  fetchTokens,
  PriceRequest,
  fetchPrices,
  Quote,
  fetchBuildExecuteTransaction,
} from "@avnu/avnu-sdk";
import { writeFileSync } from "fs";

import { Account, RpcProvider, stark, ec, CallData, SIMULATION_FLAG } from "starknet";
import tokens from "./tokens.json";

const provider = new RpcProvider({
  nodeUrl: "https://starknet-mainnet.public.blastapi.io",
});

const privateKey = stark.randomAddress();
const publicKey = ec.starkCurve.getStarkKey(privateKey);
const account = new Account(provider, publicKey, privateKey);

async function getQuote(sellTokenAddress: string, buyTokenAddress: String, amount: number) {
  const fetchPriceParams = {
    sellTokenAddress: sellTokenAddress,
    buyTokenAddress: buyTokenAddress,
    sellAmount: BigInt(amount),
  } as unknown as PriceRequest;

  try {
    const prices = await fetchPrices(fetchPriceParams);

    const fetchQuoteParams = {
      sellTokenAddress: sellTokenAddress,
      buyTokenAddress: buyTokenAddress,
      sellAmount: BigInt(amount),
    } as unknown as QuoteRequest;

    const quote: any = await fetchQuotes(fetchQuoteParams);
    console.log(quote);
    const quoteID = quote[0].quoteId;
    console.log(quoteID);
    const buildTransaction = await fetchBuildExecuteTransaction(
      quoteID,
      publicKey
    );
    console.log(buildTransaction);

    return { quote, buildTransaction };
  } catch (error) {
    console.log(error);
  }
}

export default getQuote;