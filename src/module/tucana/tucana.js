import * as initia from "@initia/initia.js";
import { AppConstant } from "../../utils/constant.js";
import { lcd, signAndBroadcast } from "../initia/initia.js";

class Tucana {
  address;

  async swap() {
    //Swap 1 Initia To USDC
    var args = [
      "Ari0w69X9eSgBvo1sCsf52UCM8WEtsf7YupiNqom7hs8iFZu7rMJRPyo/OnsbG7e6VNi2s/uVfxfWUnnNZzNQX8=",
      initia.bcs.vector(initia.bcs.bool()).serialize([true, true]).toBase64(),
      initia.bcs.bool().serialize(true).toBase64(),
      initia.bcs.u64().serialize(100000).toBase64(),
    ];

    const calculate = await lcd.move.viewFunction(
      AppConstant.TUCANAMODULEADDRESS,
      "router",
      "calculate_multi_hops_swap_result",
      [],
      args
    );
    // console.log(calculate);
    args.push(initia.bcs.u64().serialize(calculate.amount_out).toBase64());

    const msg = new initia.MsgExecute();
    msg.sender = this.address;
    msg.module_address = AppConstant.TUCANAMODULEADDRESS;
    msg.function_name = "multi_hops_swap";
    msg.module_name = "router";
    msg.type_args = [];
    msg.args = args;

    // console.log(msg);
    await signAndBroadcast(msg)
      .then(() => {
        console.log(
          `Successfully Swap 1 Initia To ${
            calculate.amount_out / 1000000
          } USDC for Address : ${this.address}`
        );
      })
      .catch((err) => {
        throw err;
      });

    //SWAP Back USDC To Initia
    var backArgs = [
      "Ari0w69X9eSgBvo1sCsf52UCM8WEtsf7YupiNqom7hs8iFZu7rMJRPyo/OnsbG7e6VNi2s/uVfxfWUnnNZzNQX8=",
      initia.bcs.vector(initia.bcs.bool()).serialize([true, true]).toBase64(),
      initia.bcs.bool().serialize(true).toBase64(),
      initia.bcs.u64().serialize(calculate.amount_out).toBase64(),
    ];

    const calculateBack = await lcd.move.viewFunction(
      AppConstant.TUCANAMODULEADDRESS,
      "router",
      "calculate_multi_hops_swap_result",
      [],
      backArgs
    );
    // console.log(calculate);
    backArgs.push(
      initia.bcs.u64().serialize(calculateBack.amount_out).toBase64()
    );

    const backMsg = new initia.MsgExecute();
    backMsg.sender = this.address;
    backMsg.module_address = AppConstant.TUCANAMODULEADDRESS;
    backMsg.function_name = "multi_hops_swap";
    backMsg.module_name = "router";
    backMsg.type_args = [];
    backMsg.args = backArgs;

    await signAndBroadcast(backMsg)
      .then(() => {
        console.log(
          `Successfully Swap ${calculate.amount_out / 1000000} USDC To ${
            calculateBack.amount_out / 1000000
          } INIT for Address : ${this.address}`
        );
      })
      .catch((err) => {
        throw err;
      });
  }
}

export { Tucana };
