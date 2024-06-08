import * as initia from "@initia/initia.js";
import { InitAiSigner } from "./operation/signer.js";
import { InitAiException } from "./exception/exception.js";
import { AppConstant } from "../../utils/constant.js";

class InitAi extends InitAiSigner {
  constructor(address, pk) {
    const chainId = "init-ai-1";
    const privateKeyBytes = Buffer.from(pk, "hex");
    const key = new initia.RawKey(Uint8Array.from(privateKeyBytes));
    const lcd = new initia.LCDClient(
      "https://maze-rest-617bacff-7d34-4eb8-87f4-ee16fb4e0ac7.ue1-prod.newmetric.xyz",
      {
        chainId: chainId,
        gasPrices:
          "0.151l2/aadf1a9da6a38b7e7e11839364ee42002260eff1657f403b9ce608337bcb986b",
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
    this.exception = new InitAiException(this);
  }

  async requestCreateCollection() {
    try {
      var prompt = `Something with number number ${Math.floor(
        Date.now() / 1000
      )}`;
      console.log(`Creating collection with prompt ${prompt}`);
      const msg = new initia.MsgExecute(
        this.key.accAddress,
        AppConstant.BRIDGEMODULEADDRESS,
        "ai_generate_nft",
        "request_create_collection",
        undefined,
        [
          initia.bcs.string().serialize(prompt).toBase64(),
          initia.bcs.string().serialize(prompt).toBase64(),
          initia.bcs.string().serialize(prompt).toBase64(),
          initia.bcs.u8().serialize(1).toBase64(),
        ]
      );

      await this.signAndBroadcast(msg)
        .then(() => {
          console.log(
            `Successfully Request for generate NFT Collection ${this.address}`
          );
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      //   console.log(error);
      this.exception.handlingError(error, "requestCreateCollection");
    }
  }
  async requestMint() {
    try {
      var prompt = `Create me an Assasin holding blade with number ${
        Math.floor(Math.random() * 10000) + 1
      }`;
      console.log(
        `Mint Nft on collection Assasin Holding blade NFT with prompt ${prompt}`
      );
      const msg = new initia.MsgExecute(
        this.key.accAddress,
        AppConstant.BRIDGEMODULEADDRESS,
        "ai_generate_nft",
        "request_mint",
        undefined,
        [
          initia.bcs
            .address()
            .serialize(
              "0xa239f18a073482b2c000e9b6be85f3ba055d20fcbd8d1dd6b388d93d28a5ded6"
            )
            .toBase64(),
          initia.bcs.string().serialize(prompt).toBase64(),
          initia.bcs.u8().serialize(1).toBase64(),
        ]
      );

      await this.signAndBroadcast(msg)
        .then(() => {
          console.log(
            `Successfully Request for generate NFT Collection ${this.address}`
          );
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      //   console.log(error);
      this.exception.handlingError(error, "requestMint");
    }
  }
}

export { InitAi };
