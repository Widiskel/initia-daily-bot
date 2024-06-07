import * as initia from "./src/module/initia/initia.js";
import * as routine from "./src/module/initia/initia_routine.js";
import { account } from "./src/account.js";
import { AppConstant } from "./src/utils/constant.js";
import { Tucana } from "./src/module/tucana/tucana.js";
import { Pair } from "./src/utils/enum/pair.js";
import { Civitia } from "./src/module/civitia/civitia.js";
import { getTucanaFaucet } from "./src/repository/tucana_repo.js";
import { Config } from "./config.js";

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
                  const tucana = new Tucana(walletAddress, privateKey);
                  const civitia = new Civitia(walletAddress, privateKey);
                  if (initBalance / 1000000 < 10) {
                    reject(
                      `Balance < 20 Initia for account ${walletAddress}, Please request initia token from faucet `
                    );
                  } else {
                    const config = new Config(
                      routine,
                      civitia,
                      tucana,
                      walletAddress
                    );

                    for (const number of config.config) {
                      await config.executeConfigCode(number);
                    }

                    routine.resetRoutine();
                    tucana.exception.resetRoutine();
                    civitia.exception.resetRoutine();
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
