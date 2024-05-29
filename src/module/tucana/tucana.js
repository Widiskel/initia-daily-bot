import * as initia from "@initia/initia.js";
import { AppConstant } from "../../utils/constant";

class Tucana {
  address;

  async swap() {
    const msg = new initia.MsgExecute();

    msg.sender = this.address;
    msg.module_address = AppConstant.TUCANAMODULEADDRESS;
    msg.function_name = "multi_hops_swap";
  }
}

export { Tucana };
