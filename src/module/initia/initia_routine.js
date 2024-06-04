import * as initia from "./initia.js";
import { AppConstant } from "../../utils/constant.js";
import { Pair } from "../../utils/enum/pair.js";

const maxRetries = 3;
var retryableErrors = [];

function resetRoutine() {
  retryableErrors = [];
}

async function sendOneInitToOther() {
  try {
    await initia.sendToken();
  } catch (error) {
    await handlingError(error, "sendOneInitToOther");
  }
}
async function sendOneInitToOtherLayer(bridgeId) {
  try {
    await initia.sendTokenDifferentLayer(bridgeId);
  } catch (error) {
    await handlingError(error, "sendOneInitToOtherLayer", bridgeId);
  }
}
async function claimExp() {
  try {
    await initia.claimExp();
  } catch (error) {
    await handlingError(error, "claimExp");
  }
}
async function swap(oneway, pair) {
  try {
    await initia.swap(oneway, pair);
  } catch (error) {
    await handlingError(error, "swap", pair);
  }
}

async function stakeInit(pair) {
  try {
    if (pair == Pair.INITIAUSDC) {
      await initia.stakeInitUsdc();
    } else if (pair == Pair.INITIATIA) {
      await initia.stakeTiaInitia();
    } else if (pair == Pair.INITIAETH) {
      await initia.stakeEthInitia();
    } else {
      await initia.stakeInit();
    }
  } catch (error) {
    await handlingError(error, "stakeInit", pair);
  }
}

async function retryContext(context, subcontext) {
  console.log(`Retrying... ${context} ${subcontext}`);
  if (context === "sendOneInitToOther") {
    await sendOneInitToOther();
  } else if (context === "sendOneInitToOtherLayer") {
    await sendOneInitToOtherLayer(subcontext);
  } else if (context === "claimExp") {
    await claimExp();
  } else if (context === "swap") {
    await swap(false, subcontext);
  } else if (context === "stakeInit") {
    if (subcontext) {
      await stakeInit(subcontext);
    } else {
      await stakeInit();
    }
  }
}

async function handlingError(error, context, subcontext) {
  if (error.response != undefined) {
    if (error.response.data.message.includes("rpc error")) {
      if (retryableErrors.filter((val) => val == context).length < maxRetries) {
        retryableErrors.push(context);
        console.error(
          `Error during ${context} : RPC error ${
            subcontext != undefined
              ? `(${
                  AppConstant.getKey(subcontext) != undefined
                    ? AppConstant.getKey(subcontext)
                    : subcontext
                })`
              : ""
          }`
        );
        await retryContext(context, subcontext);
      } else {
        console.error(
          `Error during ${context} : RPC error ${
            subcontext != undefined
              ? `(${
                  AppConstant.getKey(subcontext) != undefined
                    ? AppConstant.getKey(subcontext)
                    : subcontext
                })`
              : ""
          } Max retry limit reached`
        );
      }
    } else {
      console.error(
        `Error during ${context} ${
          subcontext != undefined
            ? AppConstant.getKey(subcontext) != undefined
              ? AppConstant.getKey(subcontext)
              : subcontext
            : ""
        } : `,
        error.response.data.message
      );
    }
  } else {
    console.error(
      `Error during ${context} ${
        subcontext != undefined
          ? `(${
              AppConstant.getKey(subcontext) != undefined
                ? AppConstant.getKey(subcontext)
                : subcontext
            })`
          : ""
      }: `,
      error.message
    );
  }
}

export {
  sendOneInitToOther,
  claimExp,
  swap,
  stakeInit,
  sendOneInitToOtherLayer,
  resetRoutine,
};
