import * as initia from "@initia/initia.js";
import { account } from "../src/account.js";
import * as initiaRepo from "../src/repository/initia_repo.js";
import { AppConstant } from "../src/utils/constant.js";

const lcd = new initia.LCDClient("https://lcd.initiation-1.initia.xyz", {
  chainId: "initiation-1",
});
const moduleAddress = "0x1";
const moduleName = "dex";
const fnName = "get_pool_info";
const viewModule = async (moduleAddress, moduleName, fnName) => {
  const viewResult = await lcd.move.viewFunction(
    moduleAddress,
    moduleName,
    fnName,
    undefined,
    [
      initia.bcs
        .address()
        .serialize(
          "0xb8b4c3af57f5e4a006fa35b02b1fe7650233c584b6c7fb62ea6236aa26ee1b3c"
        )
        .toBase64(),
    ]
  );
  console.log(viewResult);
};

viewModule(moduleAddress, moduleName, fnName);
