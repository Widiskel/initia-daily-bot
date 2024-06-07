import * as initia from "./src/module/initia/initia.js";
import * as routine from "./src/module/initia/initia_routine.js";
import { account } from "./src/account.js";
import { AppConstant } from "./src/utils/constant.js";
import { Tucana } from "./src/module/tucana/tucana.js";
import { Pair } from "./src/utils/enum/pair.js";
import { Civitia } from "./src/module/civitia/civitia.js";

async function doQuest(walletAddress, privateKey) {
  return new Promise(async (resolve, reject) => {
    try {
      await initia
        .initiation(walletAddress, privateKey)
        .then(async () => {
          await initia.checkGas().then(async (gasBalance) => {
            if (gasBalance / 1000000 < 5) {
              reject(
                `Account ${walletAddress} GAS Token is not enough, min balance is 5 GAS`
              );
            } else {
              await initia
                .queryBalance(AppConstant.COIN.INIT)
                .then(async (initBalance) => {
                  console.log(`Account ${walletAddress} Information`);
                  console.log();
                  console.log(
                    "Doing daily routine for Account " + walletAddress
                  );
                  console.log();
                  if (initBalance / 1000000 < 10) {
                    reject(
                      `Balance < 20 Initia for account ${walletAddress}, Please request initia token from faucet `
                    );
                  } else {
                    // console.log(
                    //   "1. Send 1 Init to Other for Account" + walletAddress
                    // );
                    // await routine.sendOneInitToOther();
                    // console.log();

                    // console.log(
                    //   "2. Send 1 Init to Other (BLACKWING) for Account" +
                    //     walletAddress
                    // );
                    // await routine.sendTokenToOtherLayer(
                    //   AppConstant.BridgeID.BLACKWING
                    // );
                    // console.log();

                    // console.log(
                    //   "3. Send 1 Init to Other (Noon) for Account" +
                    //     walletAddress
                    // );
                    // await routine.sendTokenToOtherLayer(
                    //   AppConstant.BridgeID.NOON
                    // );
                    // console.log();

                    // console.log(
                    //   "4. Send 1 Init to Other (TUCANA) for Account" +
                    //     walletAddress
                    // );
                    // await routine.sendTokenToOtherLayer(
                    //   AppConstant.BridgeID.TUCANA
                    // );
                    // console.log();

                    // console.log(
                    //   "5. Send 1 Init to Other (INIT AI) for Account" +
                    //     walletAddress
                    // );
                    // await routine.sendTokenToOtherLayer(
                    //   AppConstant.BridgeID.INITAI
                    // );
                    // console.log();

                    // console.log(
                    //   "6. Send 1 Init to Other (MINIMOVE) for Account" +
                    //     walletAddress
                    // );
                    // await routine.sendTokenToOtherLayer(
                    //   AppConstant.BridgeID.MINIMOVE
                    // );
                    // console.log();

                    // console.log(
                    //   "7. Send 1 Init to Other (MINIWASM) for Account" +
                    //     walletAddress
                    // );
                    // await routine.sendTokenToOtherLayer(
                    //   AppConstant.BridgeID.MINIWASM
                    // );
                    // console.log();

                    // console.log(
                    //   "8. Send 1 Init to Other (CIVITA) for Account" +
                    //     walletAddress
                    // );
                    // await routine.sendTokenToOtherLayer(
                    //   AppConstant.BridgeID.CIVITA
                    // );
                    // console.log();

                    // console.log(
                    //   "10. Send 0.1 TIA to Other (NOON) for Account " +
                    //     walletAddress
                    // );
                    // await routine.sendTokenToOtherLayer(
                    //   AppConstant.BridgeID.NOON,
                    //   AppConstant.COIN.TIA,
                    //   0.1,
                    //   "transfer"
                    // );
                    // console.log();

                    // console.log(
                    //   "11. Send 1 USDC to Other (BLACKWING) for Account " +
                    //     walletAddress
                    // );
                    // await routine.sendTokenToOtherLayer(
                    //   AppConstant.BridgeID.BLACKWING,
                    //   AppConstant.COIN.USDC,
                    //   1,
                    //   "transfer"
                    // );
                    // console.log();

                    // console.log(
                    //   "12. Send 5 TUC to Other (TUCANA) for Account " +
                    //     walletAddress
                    // );
                    // await routine.sendTokenToOtherLayer(
                    //   AppConstant.BridgeID.TUCANA,
                    //   AppConstant.COIN.TUCANA,
                    //   5,
                    //   "transfer"
                    // );
                    // console.log();

                    // console.log(
                    //   "13. Send 0.0001 ETH to Other (TUCANA) for Account " +
                    //     walletAddress
                    // );
                    // await routine.sendTokenToOtherLayer(
                    //   AppConstant.BridgeID.MINIMOVE,
                    //   AppConstant.COIN.ETH,
                    //   0.0001,
                    //   "transfer"
                    // );
                    // console.log();

                    // console.log(
                    //   "14. Swap 1 INIT to USDC for Account " + walletAddress
                    // );
                    // await routine.swap(false, Pair.INITIAUSDC);
                    // console.log();

                    // console.log(
                    //   "15 Swap 1 INIT to TIA for Account " + walletAddress
                    // );
                    // await routine.swap(false, Pair.INITIATIA);
                    // console.log();

                    // console.log(
                    //   "16. Stake 0.1 INIT to Omninode Account " + walletAddress
                    // );
                    // await routine.stakeInit();
                    // console.log();

                    // console.log(
                    //   "17. Stake 0.5 USDC / INITIA LP to Omninode Account " +
                    //     walletAddress
                    // );
                    // await routine.stakeInit(Pair.INITIAUSDC);
                    // console.log();

                    // console.log(
                    //   "18. Stake 0.01 TIA / INITIA LP to Omninode Account " +
                    //     walletAddress
                    // );
                    // await routine.stakeInit(Pair.INITIAUSDC);
                    // console.log();

                    // console.log(
                    //   "19. Stake 0.0001 ETH / INITIA LP to Omninode Account " +
                    //     walletAddress
                    // );
                    // await routine.stakeInit(Pair.INITIAETH);
                    // console.log();

                    const tucana = new Tucana(walletAddress, privateKey);
                    console.log(
                      "20. Swap 1 INIT to USDC on TUCANA Account" +
                        walletAddress
                    );
                    await tucana.swap();

                    // const civitia = new Civitia(walletAddress, privateKey);
                    // console.log(
                    //   "21. Roll Civitia Dice 3x For Account" + walletAddress
                    // );
                    // for (let x = 0; x < 3; x++) {
                    //   await civitia.rollDice();
                    // }

                    routine.resetRoutine();
                    resolve(true);
                  }
                })
                .then((error) => reject(error));
            }
          });
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

export { doQuest };
