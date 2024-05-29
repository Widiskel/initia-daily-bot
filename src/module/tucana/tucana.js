import * as initia from "@initia/initia.js";
import { AppConstant } from "../../utils/constant.js";

class Tucana {
  address;

  async swap() {
    const msg = new initia.MsgExecute();

    msg.sender = this.address;
    msg.module_address = AppConstant.TUCANAMODULEADDRESS;
    msg.function_name = "multi_hops_swap";
    msg.module_name = "router";
    msg.type_args = [];
    msg.args = [];
    // [
    //   "AoXhQ3eDkb1e8E8Cgr73TqBY3ncaikEV0CjVRLezcNzVrUotrLRtMca3IuvFDGNAkIsOE1V5vZIx46zncKhQHPc=",
    //   "AgAB",
    //   "AQ==",
    //   "QEIPAAAAAAA=",
    //   "dl8KAAAAAAA="
    // ];

    console.log(msg);
  }
}

export { Tucana };
