import { Initia } from "../initia.js";

/**
 * Initia Exception class.
 *
 * Author : Widiskel
 *
 */
class InitiaException {
  constructor(initia) {
    this.maxRetries = 3;
    this.retryableErrors = [];

    /** @type {Initia} */
    this.initia = initia;
  }

  resetRoutine() {
    this.retryableErrors = [];
  }

  async retryContext(context, subcontext) {
    console.log(`Retrying... ${context} ${subcontext}`);
    if (context === "sendOneInitToOther") {
      await this.initia.sendOneInitToOther();
    } else if (context === "sendTokenToOtherLayer") {
      await this.initia.sendTokenToOtherLayer(
        subcontext[0],
        subcontext[1],
        subcontext[2]
      );
    } else if (context === "swap") {
      await this.initia.swap(false, subcontext);
    } else if (context === "claimStakingReward") {
      await this.initia.claimStakingReward();
    } else if (context === "vote") {
      await this.initia.vote();
    } else if (context === "bridge") {
      await this.initia.bridge(subcontext[0], subcontext[1], subcontext[2]);
    } else if (context === "moveStakes") {
      await this.initia.moveStakes();
    } else if (context === "stake") {
      await this.initia.stake(subcontext);
    }
  }

  async handlingError(error, context, subcontext) {
    if (error.response != undefined) {
      if (error.response.data.message.includes("rpc error")) {
        if (
          this.retryableErrors.filter((val) => val == context).length <
          this.maxRetries
        ) {
          this.retryableErrors.push(context);
          console.error(
            `Error during ${context} : RPC error ${
              subcontext != undefined ? `(${subcontext})` : ""
            } ${error.response.data.message}`
          );
          await this.retryContext(context, subcontext);
        } else {
          console.error(
            `Error during ${context} : RPC error ${
              subcontext != undefined ? `(${subcontext})` : ""
            } Max retry limit reached`
          );
        }
      } else {
        console.error(
          `Error during ${context} ${
            subcontext != undefined ? `(${subcontext})` : ""
          } : `,
          error.response.data.message
        );
      }
    } else {
      console.error(
        `Error during ${context} ${
          subcontext != undefined ? `(${subcontext})` : ""
        }: `,
        error.message
      );
    }
  }
}

export { InitiaException };
