import * as initia from "@initia/initia.js";
import { AppConstant } from "../../utils/constant.js";
import { lcd, signAndBroadcast } from "../initia/initia.js";
import { TucanaSigner } from "./operation/signer.js";
import { TucanaException } from "./exception/exception.js";

class Tucana extends TucanaSigner {
  constructor(address, pk) {
    const chainId = "birdee-1";
    const privateKeyBytes = Buffer.from(pk, "hex");
    const key = new initia.RawKey(Uint8Array.from(privateKeyBytes));
    const lcd = new initia.LCDClient(
      "https://maze-rest-c9796789-107d-49ab-b6de-059724d2a91d.ue1-prod.newmetric.xyz",
      {
        chainId: "birdee-1",
        gasPrices: "0.151utuc",
        gasAdjustment: "2.0",
      }
    );
    const wallet = new initia.Wallet(lcd, key);

    super(wallet, lcd);

    this.address = address;
    this.pk = pk;
    this.chainId = chainId;
    this.privateKeyBytes = privateKeyBytes;
    this.key = key;
    this.lcd = lcd;
    this.wallet = wallet;
    this.exception = new TucanaException(this);
  }

  async swap() {
    try {
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
    } catch (error) {
      this.exception.handlingError(error, "swapTucana");
    }
  }

  async tucanaPerpAddLiquidity() {
    try {
      const msg = new initia.MsgExecute();
      msg.module_address = AppConstant.TUCANAPERPMODULEADDRESS;
      msg.module_name = "router";
      msg.function_name = "add_liquidity";
      msg.sender = this.address;
      msg.args = [
        initia.bcs
          .u64()
          .serialize(1 * 1000000)
          .toBase64(),
        initia.bcs
          .address()
          .serialize(AppConstant.TUCPERPMETADATAADDRESS)
          .toBase64(),
        initia.bcs.address().serialize(this.address).toBase64(),
        initia.bcs.u256().serialize(0).toBase64(),
        initia.bcs.u256().serialize(0).toBase64(),
      ];

      // console.log(msg);

      await this.signAndBroadcast(msg)
        .then(() => {
          console.log(
            `Successfully Add 1 TUC to Tucana Liquidity PERP For Address ${this.address}`
          );
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      this.exception.handlingError(error, "tucanaPerpAddLiquidity");
    }
  }
}
export { Tucana };
