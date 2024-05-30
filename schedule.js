import { Twisters } from "twisters";
import { CronJob } from "cron";
import { doQuest } from "./index.js";

(async () => {
  try {
    const twisters = new Twisters();

    twisters.put("title", {
      active: false,
      text: `
        Initia Task Runner !
    `,
    });

    const job = new CronJob(
      "38 * * * *",
      () => {
        twisters.put("title", {
          active: false,
          text: `
            Retrying ...
        `,
        });
        account.forEach(async (account) => {
          var walletAddress = account[0];
          var privateKey = account[1];
          await doQuest(walletAddress, privateKey).catch((error) =>
            console.error(error)
          );
        });
      },
      null,
      true
    );
    job.start();
  } catch (error) {
    console.error("Error During executing bot", error);
  }
})();
