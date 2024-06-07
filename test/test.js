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

const lcd = new initia.LCDClient(`https://lcd.initiation-1.initia.xyz`, {
  chainId: "initiation-1",
  gasPrices: `0.15${AppConstant.COIN.GAS}`,
  gasAdjustment: "2.0",
});
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

function generateRandomTimestamp() {
  // Generate a random timestamp within one day (in microseconds)
  const randomMicroseconds = Math.floor(Math.random() * 24 * 60 * 60 * 1000000);

  // Convert the random timestamp to microseconds
  const timestamp = randomMicroseconds;

  // Convert the timestamp to a formatted date
  const formattedDate = timestampToDate(timestamp);

  return formattedDate;
}

// Function to convert timestamp to date
function timestampToDate(timestamp) {
  // Convert the timestamp to milliseconds
  const milliseconds = timestamp / 1000000;

  // Create a Date object
  const date = new Date(milliseconds);

  // Format the date
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Return the formatted date
  return formattedDate;
}

// Generate and print three random timestamps
console.log("Random Timestamp 1:", generateRandomTimestamp());
console.log("Random Timestamp 2:", generateRandomTimestamp());
console.log("Random Timestamp 3:", generateRandomTimestamp());
