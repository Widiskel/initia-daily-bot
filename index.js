import * as initia from "./src/module/initia/initia.js";
import * as routine from "./src/module/initia/initia_routine.js";
import { account } from "./src/account.js";
import { AppConstant } from "./src/utils/constant.js";
import { Tucana } from "./src/module/tucana/tucana.js";

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
                  `Balance < 20 Initia for account ${walletAddress}, Please request initia token from faucet `
                );
              } else {
                console.log(
                  "1. Send 1 Init to Other for Account" + walletAddress
                );
                await routine.sendOneInitToOther();
                console.log();

                console.log(
                  "2. Send 1 Init to Other (BLACKWING) for Account" +
                    walletAddress
                );
                await routine.sendOneInitToOtherLayer(
                  AppConstant.BLACKWINGBRIDGEID
                );
                console.log();

                console.log(
                  "3. Send 1 Init to Other (Noon) for Account" + walletAddress
                );
                await routine.sendOneInitToOtherLayer(AppConstant.NOONBRIDGEID);
                console.log();

                console.log(
                  "4. Send 1 Init to Other (TUCANA) for Account" + walletAddress
                );
                await routine.sendOneInitToOtherLayer(
                  AppConstant.TUCANABRIDGEID
                );
                console.log();

                console.log(
                  "5. Send 1 Init to Other (INIT AI) for Account" +
                    walletAddress
                );
                await routine.sendOneInitToOtherLayer(
                  AppConstant.INITAIBRIDGEID
                );
                console.log();

                console.log(
                  "6. Send 1 Init to Other (MINIMOVE) for Account" +
                    walletAddress
                );
                await routine.sendOneInitToOtherLayer(
                  AppConstant.MINIMOVEBRIDGEID
                );
                console.log();

                console.log(
                  "7. Send 1 Init to Other (MINIWASM) for Account" +
                    walletAddress
                );
                await routine.sendOneInitToOtherLayer(
                  AppConstant.MINIWASMBRIDGEID
                );
                console.log();

                console.log(
                  "8. Swap 1 INIT to USDC for Account" + walletAddress
                );
                await routine.swap();
                console.log();

                console.log(
                  "9. Stake 0.1 INIT to Omninode Account" + walletAddress
                );
                await routine.stakeInit();
                console.log();

                // const tucana = new Tucana();
                // tucana.address = walletAddress;

                // console.log(
                //   "10. Swap 1 INIT to USDC on TUCANA Account" + walletAddress
                // );
                // await tucana.swap();
                // console.log();

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
        console.error(error)
      );
    });
  } catch (error) {
    console.error("Error During executing bot", error);
  }
})();
