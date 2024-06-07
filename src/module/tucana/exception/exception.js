class TucanaException {
  maxRetries = 3;
  retryableErrors = [];
  constructor(tucana) {
    this.tucana = tucana;
  }

  resetRoutine() {
    retryableErrors = [];
  }

  async retryContext(context, subcontext) {
    console.log(`Retrying... ${context} ${subcontext}`);
    if (context === "swapTucana") {
      await this.tucana.swap();
    } else if (context === "tucanaPerpAddLiquidity") {
      await this.tucana.tucanaPerpAddLiquidity();
    }
  }

  async handlingError(error, context, subcontext) {
    if (error.response != undefined) {
      if (error.response.data.message.includes("rpc error")) {
        if (error.response.data.message.includes("rpc error")) {
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
            retryableErrors.filter((val) => val == context).length < maxRetries
          ) {
            retryableErrors.push(context);
            console.error(
              `Error during ${context} : RPC error ${
                subcontext != undefined
                  ? `(${AppConstant.getKey(subcontext)})`
                  : ""
              }`
            );
            await retryContext(context, subcontext);
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
