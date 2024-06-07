import * as initia from "@initia/initia.js";
import { account } from "../src/account.js";
import * as initiaRepo from "../src/repository/initia_repo.js";
import { AppConstant } from "../src/utils/constant.js";
import { signAndBroadcast } from "../src/module/initia/initia.js";

// for (let index = 0; index < 30; index++) {
//   const hash = initia.bcs.option(initia.bcs.u64()).serialize(index).toBase64();
//   if (hash == "CHRyYW5zZmVy=") {
//     console.log(index);
//     // console.log(initia.bcs.u64().serialize(index).toBase64());
//   } else {
//     console.log(hash);
//     // console.log(initia.bcs.u64().serialize(index).toBase64());
//   }
// }

//DESERIALIZE
// console.log(
//   initia.bcs
//     .vector(initia.bcs.u8()) // type
//     .parse(Uint8Array.from(Buffer.from("AbguDwAAAAAA=", "base64")))
// );

// console.log(
//   initia.bcs
//     .string() // type
//     .parse(
//       Uint8Array.from(
//         Buffer.from(
//           "K2luaXQxZ2FkenJqY3AzZWY5MHlrYTNzejJyNnRmNHdyamRoZTJxcjBoeXA=",
//           "base64"
//         )
//       )
//     )
// );
// console.log(
//   initia.bcs
//     .string() // type
//     .parse(Uint8Array.from(Buffer.from("CmNoYW5uZWwtMzE=", "base64")))
// );

// console.log(
//   initia.bcs
//     .address() // type
//     .serialize(
//       "0x29824d952e035490fae7567deea5f15b504a68fa73610063c160ab1fa87dd609"
//     )
//     .toBase64()
// );

// const lcd = new initia.LCDClient(`https://lcd.initiation-1.initia.xyz`, {
//   chainId: "initiation-1",
//   gasPrices: `0.15${AppConstant.COIN.GAS}`,
//   gasAdjustment: "2.0",
// });
const privateKeyBytes = Buffer.from(account[0][1], "hex");
const key = new initia.RawKey(Uint8Array.from(privateKeyBytes));

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

// const msg = new initia.MsgTransfer(
//   "transfer",
//   "channel-31",
//   initia.Coin.fromString(`${0.001 * 1000000}utia`),
//   "init1gadzrjcp3ef90yka3sz2r6tf4wrjdhe2qr0hyp",
//   "init1gadzrjcp3ef90yka3sz2r6tf4wrjdhe2qr0hyp",
//   new initia.Height(0, 0),
//   formatDateNowToCustomFormat()
//   // "Sep 19, 1722, 12:32:50 PM (UTC)"
// );
// console.log(msg);
// const wallet = new initia.Wallet(lcd, key);
// try {
//   const signedTx = await wallet.createAndSignTx({
//     msgs: [msg],
//   });

//   console.log("TX Signature : ", signedTx.signatures[0]);
//   const broadcastResult = await lcd.tx.broadcast(signedTx);
//   console.log("TX Hash : ", broadcastResult.txhash);
//   console.log(
//     `Explorer : https://scan.testnet.initia.xyz/initiation-1/txs/${broadcastResult.txhash}`
//   );
// } catch (error) {
//   if (error.response) {
//     console.log(error.response.data.message);
//   } else {
//     console.log(error);
//   }
// }
import { LCDClient, Wallet, MnemonicKey, MsgExecute } from "@initia/initia.js";

const lcd = new LCDClient(
  "https://maze-rest-sequencer-beab9b6f-d96d-435e-9caf-5679296d8172.ue1-prod.newmetric.xyz",
  {
    chainId: "landlord-1",
    gasPrices:
      "0.151l2/afaa3f4e1717c75712f8e8073e41f051a4e516cd25daa82d948c4729388edefd",
    gasAdjustment: "2.0",
  }
);
const wallet = new Wallet(lcd, key);
const msg = new MsgExecute(
  key.accAddress,
  "0x99132d33b555cd1565c59cee1e0e4ff52fbc7fb7",
  "civitia",
  "roll_dice"
);

const execute = async () => {
  const signedTx = await wallet.createAndSignTx({
    msgs: [msg],
  });

  const broadcastResult = await lcd.tx.broadcast(signedTx);
  console.log(broadcastResult);
};
execute();
