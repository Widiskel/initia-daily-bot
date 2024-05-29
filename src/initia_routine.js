import * as initia from "./initia.js";

async function sendOneInitToOther() {
  try {
    await initia.sendToken();
  } catch (error) {
    if (error.message && error.message.includes("rpc error")) {
      console.log("Error during sending token: RPC error");
    } else {
      console.log("Error during sending token : ", error.response.data.message);
    }
  }
}
async function claimExp() {
  try {
    await initia.claimExp();
  } catch (error) {
    console.log("Error during claiming exp : ", error.response.data.message);
  }
}
async function swap() {
  try {
    await initia.swap();
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

export { sendOneInitToOther, claimExp, swap, swapTucana };
