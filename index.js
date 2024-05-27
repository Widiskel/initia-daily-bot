import * as initia from "./src/initia.js";
import * as routine from "./src/initia_routine.js";
import { account } from "./src/account.js";
const TOTALSEND = 10;
const TOTALSWAP = 10;
(async () => {
  try {
    account.forEach(async (account) => {
      var walletAddress = account[0];
      var privateKey = account[1];
      await initia.initiation(walletAddress, privateKey);
      console.log(`Account ${walletAddress} Information`);
      const initBalance = await initia.queryBalance();

      console.log();
      console.log("Doing daily routine");
      if (initBalance.amount / 1000000 < 20) {
        console.log();
        console.log(
          "Balance < 20 Initia, Please request initia token from faucet"
        );
        console.log();
      } else {
        console.log("1. Send 1 Init to Other");
        console.log(`Sending 1 init ${TOTALSEND} X`);
        for (let send = 0; send < TOTALSEND; send++) {
          await routine.sendOneInitToOther();
        }
        console.log("2. Swap 1 INIT to USDC");
        for (let swap = 0; swap < TOTALSWAP; swap++) {
          await routine.swap();
        }

        // console.log("3. Claim EXP");
        // await routine.claimExp();
      }
    });
  } catch (error) {
    console.log("Error During executing bot", error);
  }
})();
