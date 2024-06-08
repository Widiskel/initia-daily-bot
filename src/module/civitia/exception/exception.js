import { AppConstant } from "../../../utils/constant.js";
import { Civitia } from "../civitia.js";

class CivitiaException {
  constructor(civitia) {
    this.maxRetries = 3;
    this.retryableErrors = [];

    /** @type {Civitia} */
    this.civitia = civitia;
  }

  resetRoutine() {
    this.retryableErrors = [];
  }

  async retryContext(context, subcontext) {
    console.log(`Retrying... ${context} ${subcontext}`);
    if (context === "rollDice") {
      await this.civitia.rollDice();
    }
  }

  async handlingError(error, context, subcontext) {
    if (error.response != undefined) {
      if (error.response.data.message.includes("rpc error")) {
        if (error.response.data.message.includes("account")) {
          console.error(
            `Error during ${context} : RPC error account not found in civitia chain ${
              this.address
            }. ${
              subcontext != undefined
                ? `(${AppConstant.getKey(subcontext)})`
                : ""
            }`
          );
        } else {
          if (
            this.retryableErrors.filter((val) => val == context).length <
            this.maxRetries
          ) {
            this.retryableErrors.push(context);
            console.error(
              `Error during ${context} : RPC error ${
                subcontext != undefined
                  ? `(${AppConstant.getKey(subcontext)})`
                  : ""
              }`
            );
            await this.retryContext(context, subcontext);
          } else {
            console.error(
              `Error during ${context} : RPC error ${
                subcontext != undefined
                  ? `(${AppConstant.getKey(subcontext)})`
                  : ""
              }Max retry limit reached`
            );
          }
        }
      } else {
        console.error(
          `Error during ${context} ${
            subcontext != undefined ? AppConstant.getKey(subcontext) : ""
          } : `,
          error.response.data.message
        );
      }
    } else {
      console.error(
        `Error during ${context} ${
          subcontext != undefined ? `(${AppConstant.getKey(subcontext)})` : ""
        }: `,
        error.message
      );
    }
  }
}

export { CivitiaException };
