import * as initia from "./src/initia.js";
import * as routine from "./src/initia_routine.js";
import { account } from "./src/account.js";

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
      console.log("1. Send 1 Init to Other");
      if (initBalance.amount / 1000000 < 20) {
        console.log();
        console.log("Balance < 20 Initia, Skipping task");
        console.log();
      } else {
        await routine.sendOneInitToOther();
      }
      console.log("2. Claim EXP");
      await routine.claimExp();
    });
  } catch (error) {
    console.log("Error During executing bot", error);
  }
})();
