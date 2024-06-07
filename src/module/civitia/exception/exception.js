import { AppConstant } from "../../../utils/constant.js";
import { Civitia } from "../civitia.js";

class CivitiaException {
  maxRetries = 3;
  retryableErrors = [];
  civitia;
  constructor(civitia) {
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
        if (error.response.data.message.includes("rpc error")) {
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
            retryableErrors.filter((val) => val == context).length <
            this.maxRetries
          ) {
            retryableErrors.push(context);
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
