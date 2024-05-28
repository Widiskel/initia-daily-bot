import * as initia from "./src/initia.js";
import * as routine from "./src/initia_routine.js";
import { account } from "./src/account.js";

async function doQuest(walletAddress, privateKey) {
  return new Promise(async (resolve, reject) => {
    try {
      await initia
        .initiation(walletAddress, privateKey)
        .then(async () => {
          await initia
            .queryBalance()
            .then(async (initBalance) => {
              console.log(`Account ${walletAddress} Information`);
              console.log();
              console.log("Doing daily routine for Account " + walletAddress);
              if (initBalance.amount / 1000000 < 10) {
                reject(
                  `Balance < 10 Initia for account ${walletAddress}, Please request initia token from faucet `
                );
              } else {
                console.log(
                  "1. Send 1 Init to Other for Account" + walletAddress
                );
                await routine.sendOneInitToOther();
                console.log();

                console.log(
                  "2. Swap 1 INIT to USDC for Account" + walletAddress
                );
                await routine.swap();
                console.log();

                console.log(
                  "3. Stake 0.1 INIT to Omninode Account" + walletAddress
                );
                await routine.stakeInit();
                console.log();

                // console.log("3. Claim EXP");
                // await routine.claimExp();
                resolve(true);
              }
            })
            .then((error) => reject(error));
        })
        .then((error) => reject(error));
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
