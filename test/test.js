import * as initia from "@initia/initia.js";
import { account } from "../src/account.js";
import * as initiaRepo from "../src/repository/initia_repo.js";
import { AppConstant } from "../src/utils/constant.js";

for (let index = 0; index < 30; index++) {
  const hash = initia.bcs.u64().serialize(index).toBase64();
  if (hash == "GAAAAAAAAAA=") {
    console.log(index);
    console.log(initia.bcs.u64().serialize(index).toBase64());
  } else {
    console.log(initia.bcs.u64().serialize(index).toBase64());
  }
}
