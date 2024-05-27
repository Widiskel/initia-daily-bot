import * as initia from "./src/initia.js";
import * as routine from "./src/initia_routine.js";
import { account } from "./src/account.js";
const TOTALSEND = 10;
const TOTALSWAP = 10;

async function doQuest(walletAddress, privateKey) {
  return new Promise(async (resolve, reject) => {
    try {
      await initia.initiation(walletAddress, privateKey);
      console.log(`Account ${walletAddress} Information`);
      const initBalance = await initia.queryBalance();
      console.log();
      console.log("Doing daily routine for Account " + walletAddress);
      if (initBalance.amount / 1000000 < 20) {
        reject(
          `Balance < 20 Initia for account ${walletAddress}, Please request initia token from faucet `
        );
      } else {
        console.log("1. Send 1 Init to Other for Account" + walletAddress);
        console.log();
        for (let send = 0; send < TOTALSEND; send++) {
          await routine.sendOneInitToOther();
        }
        console.log("2. Swap 1 INIT to USDC for Account" + +walletAddress);
        console.log();
        for (let swap = 0; swap < TOTALSWAP; swap++) {
          await routine.swap();
        }

        // console.log("3. Claim EXP");
        // await routine.claimExp();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

(async () => {
  try {
    account.forEach(async (account) => {
      var walletAddress = account[0];
      var privateKey = account[1];
      await doQuest(walletAddress, privateKey).catch((error) =>
        console.log(error)
      );
    });
  } catch (error) {
    console.log("Error During executing bot", error);
  }
})();
