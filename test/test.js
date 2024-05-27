import * as initia from "@initia/initia.js";
import { account } from "../src/account.js";
import * as initiaRepo from "../src/repository/initia_repo.js";
import { AppConstant } from "../src/utils/constant.js";

const lcd = new initia.LCDClient("https://lcd.initiation-1.initia.xyz", {
  chainId: "initiation-1",
  gasPrices: "0.151uinit",
  gasAdjustment: "2.0",
});

const address = account[1][0];
const privateKeyBytes = Buffer.from(account[1][1], "hex");
const key = new initia.RawKey(Uint8Array.from(privateKeyBytes));

const wallet = new initia.Wallet(lcd, key);
const stage = await initiaRepo.getStageInfo();
const referalPoint = await initiaRepo.getReferalPoint();

console.log(JSON.parse(stage.data).current_stage);

const msg = new initia.MsgExecute();
msg.function_name = "claim_point";
msg.module_address = AppConstant.CLAIMPOINTMODULEADDRESS;
msg.module_name = "initia_xp";
msg.sender = address;
msg.type_args = [];
msg.args = [
  initia.bcs.u64().serialize(JSON.parse(stage.data).current_stage).toBase64(),
  initia.bcs
    .vector(initia.bcs.u8())
    .serialize(initia.bcs.u8().serialize(0).toBase64().split(""))
    .toBase64(),
  initia.bcs.u64().serialize(100).toBase64(),
  initia.bcs.u64().serialize(referalPoint.referral_point).toBase64(),
];
console.log(msg);

const execute = async () => {
  try {
    const signedTx = await wallet.createAndSignTx({
      msgs: [msg],
    });

    const broadcastResult = await lcd.tx.broadcast(signedTx);
    console.log(broadcastResult);
  } catch (error) {
    throw error;
  }
};
try {
  await execute();
} catch (error) {
  console.log(error.response.data.message);
}
