import * as initia from "@initia/initia.js";
import { account } from "../src/account.js";
import * as initiaRepo from "../src/repository/initia_repo.js";
import { AppConstant } from "../src/utils/constant.js";

// for (let index = 0; index < 30; index++) {
//   const hash = initia.bcs.u64().serialize(index).toBase64();
//   if (hash == "GAAAAAAAAAA=") {
//     console.log(index);
//     console.log(initia.bcs.u64().serialize(index).toBase64());
//   } else {
//     console.log(initia.bcs.u64().serialize(index).toBase64());
//   }
// }

//DESERIALIZE
console.log(
  initia.bcs
    .option(initia.bcs.u64()) // type
    .parse(Uint8Array.from(Buffer.from("AYMtAQAAAAAA", "base64")))
);

// const lcd = new initia.LCDClient(`https://lcd.initiation-1.initia.xyz`, {
//   chainId: "initiation-1",
//   gasPrices: `0.15${AppConstant.COIN.GAS}`,
//   gasAdjustment: "2.0",
// });

// const args = [
//   initia.bcs.address().serialize(AppConstant.INITIAUSDCLIQUIDITYADDRESS).toBase64(),
//   initia.bcs.address().serialize(AppConstant.USDCMETADATAADDRESS).toBase64(),
//   initia.bcs
//     .u64()
//     .serialize(0.1 * 1000000)
//     .toBase64(),
// ];

// const simulate = await lcd.move.viewFunction(
//   AppConstant.BRIDGEMODULEADDRESS,
//   "dex_utils",
//   "single_asset_provide_liquidity_cal",
//   [],
//   args
// );
// console.log(args);
// console.log(simulate);

// const msg = new initia.MsgExecute();
// msg.function_name = "single_asset_provide_stake";
// msg.module_address = AppConstant.BRIDGEMODULEADDRESS;
// msg.sender = "init1wd4phwvdx2x0sxn4xulwmjsr52z8vd92767w3x";
// msg.module_name = "dex_utils";
// msg.args = [
//   initia.bcs.address().serialize(AppConstant.INITIAUSDCLIQUIDITYADDRESS).toBase64(),
//   initia.bcs.address().serialize(AppConstant.USDCMETADATAADDRESS).toBase64(),
//   initia.bcs
//     .u64()
//     .serialize(0.1 * 1000000)
//     .toBase64(),
//   initia.bcs.option(initia.bcs.u64()).serialize(simulate[0]).toBase64(),
//   initia.bcs.string().serialize(simulate[1]).toBase64(),
// ];

// console.log(msg);
