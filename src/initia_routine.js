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
async function swapTucana() {
  try {
    await initia.swapTucana();
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
async function swapTucana() {
  try {
    await initia.swapTucana();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      if (error.message && error.message.includes("rpc error")) {
        console.log("Error during swapping initia: RPC error");
      } else {
        console.log(
          "Error during swapping initia:",
          error.response.data.message
        );
      }
    } else {
      console.log("Error during swapping innitia", error);
    }
  }
}

export {
  sendOneInitToOther,
  claimExp,
  swap, swapTucana,
  stakeInit,
  sendOneInitToOtherLayer,
};
