import { AppConstant } from "../../../utils/constant.js";
import { InitAi } from "../init_ai.js";

class InitAiException {
  constructor(initAi) {
    this.maxRetries = 3;
    this.retryableErrors = [];

    /** @type {InitAi} */
    this.initAi = initAi;
  }

  resetRoutine() {
    this.retryableErrors = [];
  }

  async retryContext(context) {
    console.log(`Retrying... ${context} \n`);
    if (context === "requestCreateCollection") {
      await this.initAi.requestCreateCollection();
    } else if (context === "requestMint") {
      await this.initAi.requestMint();
    }
  }

  async retry(context) {
    if (
      this.retryableErrors.filter((val) => val == context).length <
      this.maxRetries
    ) {
      this.retryableErrors.push(context);
      await this.retryContext(context);
    } else {
      console.error(
        `Error during ${context} : RPC error and Max retry limit reached`
      );
    }
  }

  async handlingError(error, context) {
    if (error.response != undefined) {
      if (error.response.data.message.includes("rpc error")) {
        console.error(`Error during ${context} : RPC error`);
        await this.retry(context);
      } else if (error.response.data.message.includes("failed to execute")) {
        console.error(
          `Error during ${context} : InitAI has limited uses through the day. Available again in 1 hour`
        );
        await this.retry(context);
      } else {
        console.error(`Error during ${context} `, error.response.data.message);
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

export { InitAiException };
