import * as initia from "./initia.js";

async function sendOneInitToOther() {
  try {
    await initia.sendToken();
  } catch (error) {
    console.log("Error during sending token : ", error.response.data.message);
  }
}
async function claimExp() {
  try {
    await initia.claimExp();
  } catch (error) {
    console.log("Error during claiming exp : ", error.response.data.message);
  }
}

export { sendOneInitToOther, claimExp };
