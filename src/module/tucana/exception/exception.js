import { Tucana } from "../tucana.js";

class TucanaException {
  constructor(tucana) {
    this.maxRetries = 3;
    this.retryableErrors = [];

    /** @type {Tucana} */
    this.tucana = tucana;
  }

  resetRoutine() {
    this.retryableErrors = [];
  }

  async retryContext(context, subcontext) {
    console.log(`Retrying... ${context} ${subcontext}`);
    if (context === "swapTucana") {
      await this.tucana.swap();
    } else if (context === "tucanaPerpAddLiquidity") {
      await this.tucana.tucanaPerpAddLiquidity();
    } else if (context === "tucanaPoolAddLiquidity") {
      await this.tucana.tucanaPoolAddLiquidity();
    } else if (context === "requestFaucet") {
      await this.tucana.requestFaucet();
    }
  }

  async handlingError(error, context, subcontext) {
    if (error.response != undefined) {
      if (error.response.data.message.includes("rpc error")) {
        if (error.response.data.message.includes("account")) {
          console.error(
            `Error during ${context} : RPC error account not found in tucana chain ${
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

export { TucanaException };
