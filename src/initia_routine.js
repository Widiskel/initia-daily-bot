import * as initia from "./initia.js";

async function sendOneInitToOther() {
  try {
    await initia.sendToken();
  } catch (error) {
    handlingError(error, "Sending Token");
  }
}
async function sendOneInitToOtherLayer(bridgeId) {
  try {
    await initia.sendTokenDifferentLayer(bridgeId);
  } catch (error) {
    handlingError(error, "Sending Token");
  }
}
async function claimExp() {
  try {
    await initia.claimExp();
  } catch (error) {
    handlingError(error, "Claiming EXP");
  }
}
async function swap() {
  try {
    await initia.swap();
  } catch (error) {
    handlingError(error, "Swap");
  }
}
async function stakeInit() {
  try {
    await initia.stakeInit();
  } catch (error) {
    handlingError(error, "Stake");
  }
}

function handlingError(error, context) {
  if (error.response != undefined) {
    if (error.response.data.message.includes("rpc error")) {
      console.error(`Error during ${context} : RPC error`);
    } else {
      console.error(`Error during ${context} : `, error.response.data.message);
    }
  } else {
    console.error(`Error during ${context} : `, error.message);
  }
}

export {
  sendOneInitToOther,
  claimExp,
  swap,
  stakeInit,
  sendOneInitToOtherLayer,
};
