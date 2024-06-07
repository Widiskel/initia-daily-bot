import * as initia from "@initia/initia.js";
import { account } from "../src/account.js";
import * as initiaRepo from "../src/repository/initia_repo.js";
import { AppConstant } from "../src/utils/constant.js";
import { signAndBroadcast } from "../src/module/initia/initia.js";

const privateKeyBytes = Buffer.from(account[0][1], "hex");
const key = new initia.RawKey(Uint8Array.from(privateKeyBytes));

//DESERIALIZE
// console.log(
//   initia.bcs
//     .u256() // type
//     .parse(
//       Uint8Array.from(
//         Buffer.from("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==", "base64")
//       )
//     )
// );

console.log(
  initia.bcs
    .u32() // type
    .parse(Uint8Array.from(Buffer.from("6v///w==", "base64")))
);
console.log(
  initia.bcs
    .u32() // type
    .parse(Uint8Array.from(Buffer.from("sAAAAA==", "base64")))
);
console.log(
  initia.bcs
    .u64() // type
    .parse(Uint8Array.from(Buffer.from("oIYBAAAAAAA=", "base64")))
);
console.log(
  initia.bcs
    .u64() // type
    .parse(Uint8Array.from(Buffer.from("HYABAAAAAAA=", "base64")))
);
console.log(
  initia.bcs
    .bool() // type
    .parse(Uint8Array.from(Buffer.from("AQ==", "base64")))
);
