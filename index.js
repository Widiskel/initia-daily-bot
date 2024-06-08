import { account } from "./account.js";
import { Tucana } from "./src/module/tucana/tucana.js";
import { Civitia } from "./src/module/civitia/civitia.js";
import { Initia } from "./src/module/initia/initia.js";
import { Config } from "./config.js";
import { COIN } from "./src/utils/enum/coin.js";
import { InitAi } from "./src/module/init_ai/init_ai.js";
import { userConfig } from "./user_config.js";

async function doQuest(walletAddress, privateKey) {
  return new Promise(async (resolve, reject) => {
    try {
      const initia = new Initia(walletAddress, privateKey);
      const tucana = new Tucana(walletAddress, privateKey, initia);
      const civitia = new Civitia(walletAddress, privateKey);
      const initAi = new InitAi(walletAddress, privateKey);

      await initia.checkGas().then(async (gasBalance) => {
        if (gasBalance / 1000000 < 5) {
          reject(
            `Account ${walletAddress} GAS Token is not enough, min balance is 5 GAS`
          );
        } else {
          console.log(`Account ${walletAddress} Information`);

          await initia
            .queryBalance(COIN.INIT)
            .then(async (initBalance) => {
              console.log();
              console.log("Doing daily routine for Account " + walletAddress);
              console.log();

              if (initBalance / 1000000 < 10) {
                reject(
                  `Balance < 20 Initia for account ${walletAddress}, Please request initia token from faucet `
                );
              } else {
                const config = new Config(
                  initia,
                  civitia,
                  tucana,
                  initAi,
                  userConfig,
                  walletAddress
                );

                for (const number of config.config) {
                  await config.executeConfigCode(number);
                }

                initia.exception.resetRoutine();
                tucana.exception.resetRoutine();
                civitia.exception.resetRoutine();
                initAi.exception.resetRoutine();
                resolve(true);
              }
            })
            .then((error) => reject(error));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

(async () => {
  try {
    for (const acc of account) {
      var walletAddress = acc[0];
      var privateKey = acc[1];
      await doQuest(walletAddress, privateKey).catch((error) =>
        console.error(error)
      );
    }
  } catch (error) {
    console.error("Error During executing bot", error);
  }
})();

export { doQuest };
