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
async function sendTokenToOtherLayer(
  bridgeId,
  coin = AppConstant.COIN.INIT,
  amount = 1,
  method = ""
) {
  try {
    if (method == "") {
      await initia.sendTokenDifferentLayer(bridgeId, coin, amount);
    } else if (method == "bridge") {
      await initia.bridge(bridgeId, coin, amount);
    } else if (method == "transfer") {
      await initia.transferToken(bridgeId, coin, amount);
    }
  } catch (error) {
    await handlingError(error, "sendTokenToOtherLayer", [
      bridgeId,
      coin,
      amount,
      method,
    ]);
  }
}

async function mixedRouteSwapTransfer(bridgeId, coin, amount) {
  try {
    await initia.mixedRouteSwapTransfer(bridgeId, coin, amount);
  } catch (error) {
    await handlingError(error, "mixedRouteSwapTransfer", [
      bridgeId,
      coin,
      amount,
    ]);
  }
}

async function claimStakingReward() {
  try {
    await initia.claimStakingReward();
  } catch (error) {
    await handlingError(error, "claimStakingReward");
  }
}
async function vote() {
  try {
    await initia.vote();
  } catch (error) {
    await handlingError(error, "vote");
  }
}

async function moveStakes() {
  try {
    await initia.moveStake();
  } catch (error) {
    await handlingError(error, "moveStakes");
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
  } else if (context === "sendTokenToOtherLayer") {
    await sendTokenToOtherLayer(
      subcontext[0],
      subcontext[1],
      subcontext[2],
      subcontext[3]
    );
  } else if (context === "mixedRouteSwapTransfer") {
    await mixedRouteSwapTransfer(subcontext[0], subcontext[1], subcontext[2]);
  } else if (context === "claimExp") {
    await claimExp();
  } else if (context === "swap") {
    await swap(false, subcontext);
  } else if (context === "claimStakingReward") {
    await claimStakingReward();
  } else if (context === "vote") {
    await vote();
  } else if (context === "moveStakes") {
    await moveStakes();
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
            subcontext != undefined ? `(${subcontext})` : ""
          } ${error.response.data.message}`
        );
        await retryContext(context, subcontext);
      } else {
        console.error(
          `Error during ${context} : RPC error ${
            subcontext != undefined ? `(${subcontext})` : ""
          } Max retry limit reached`
        );
      }
    } else {
      console.error(
        `Error during ${context} ${
          subcontext != undefined ? `(${subcontext})` : ""
        } : `,
        error.response.data.message
      );
    }
  } else {
    console.error(
      `Error during ${context} ${
        subcontext != undefined ? `(${subcontext})` : ""
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
  sendTokenToOtherLayer,
  resetRoutine,
  mixedRouteSwapTransfer,
  claimStakingReward,
  vote,
  moveStakes,
};
