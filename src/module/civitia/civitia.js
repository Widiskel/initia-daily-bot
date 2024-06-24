import * as initia from "@initia/initia.js";
import { CivitiaSigner } from "./operation/signer.js";
import { CivitiaException } from "./exception/exception.js";
import { AppConstant } from "../../utils/constant.js";
class Civitia extends CivitiaSigner {
  constructor(address, pk) {
    const chainId = "landlord-1";
    const privateKeyBytes = Buffer.from(pk, "hex");
    const key = new initia.RawKey(Uint8Array.from(privateKeyBytes));
    const lcd = new initia.LCDClient(
      "https://maze-rest-sequencer-beab9b6f-d96d-435e-9caf-5679296d8172.ue1-prod.newmetric.xyz",
      {
        chainId: chainId,
        gasPrices:
          "0.151l2/afaa3f4e1717c75712f8e8073e41f051a4e516cd25daa82d948c4729388edefd",
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
    this.exception = new CivitiaException(this);
  }

  async rollDice() {
    try {
      console.log("Rolling dice on Civitia");
      const msg = new initia.MsgExecute(
        this.key.accAddress,
        AppConstant.CIVITIAMODULEADDRESS,
        "civitia",
        "roll_dice"
      );

      //   console.log(msg);

      await this.signAndBroadcast(msg)
        .then(() => {
          console.log(`Successfully Roll Dice For Address ${this.address}`);
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      // console.log(error);
      this.exception.handlingError(error, "rollDice");
    }
  }
}

export { Civitia };
