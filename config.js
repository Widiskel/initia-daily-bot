import { Civitia } from "./src/module/civitia/civitia.js";
import { InitAi } from "./src/module/init_ai/init_ai.js";
import { Initia } from "./src/module/initia/initia.js";
import { Tucana } from "./src/module/tucana/tucana.js";
import { BridgeID } from "./src/utils/enum/bridge.js";
import { COIN } from "./src/utils/enum/coin.js";
import { Pair } from "./src/utils/enum/pair.js";

/**
 * Initia daily bot configuration class.
 *
 * @class
 * Configuration class for configuring bot feature
 *
 * Author : Widiskel
 *
 */
class Config {
  constructor(initia, civitia, tucana, initAi, userConfig, address) {
    /** @type {Civitia} */
    this.civitia = civitia;
    /** @type {Tucana} */
    this.tucana = tucana;
    /** @type {Initia} */
    this.initia = initia;
    /** @type {InitAi} */
    this.initAi = initAi;
    /** @type {string} */
    this.walletAddress = address;

    this.config = userConfig;
  }

  isInConfig = (number) => {
    return config.includes(number);
  };

  async executeConfigCode(number) {
    return new Promise(async (resolve, reject) => {
      try {
        switch (number) {
          case 1:
            console.log(
              "1. Send 1 Init to Other for Account " + this.walletAddress
            );
            await this.initia.sendOneInitToOther();
            console.log();
            break;
          case 2:
            console.log(
              "2. Send 1 Init to Other (BLACKWING) for Account " +
                this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(BridgeID.BLACKWING);
            console.log();
            break;
          case 3:
            console.log(
              "3. Send 1 Init to Other (NOON) for Account " + this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(BridgeID.NOON);
            console.log();
            break;
          case 4:
            console.log(
              "4. Send 1 Init to Other (TUCANA) for Account " +
                this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(BridgeID.TUCANA);
            console.log();
            break;
          case 5:
            console.log(
              "5. Send 1 Init to Other (INIT AI) for Account " +
                this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(BridgeID.INITAI);
            console.log();
            break;
          case 6:
            console.log(
              "6. Send 1 Init to Other (MINIMOVE) for Account " +
                this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(BridgeID.MINIMOVE);
            console.log();
            break;
          case 7:
            console.log(
              "7. Send 1 Init to Other (MINIWASM) for Account " +
                this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(BridgeID.MINIWASM);
            console.log();
            break;
          case 8:
            console.log(
              "8. Send 1 Init to Other (CIVITA) for Account " +
                this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(BridgeID.CIVITA);
            console.log();
            break;
          case 9:
            console.log(
              "9. Bridge 1 Init to (CIVITA) for Account " + this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(
              BridgeID.CIVITA,
              COIN.INIT,
              1,
              "bridge"
            );
            console.log();
            break;
          case 10:
            console.log(
              "10. Bridge 1 Init to (TUCANA) for Account " + this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(
              BridgeID.TUCANA,
              COIN.INIT,
              1,
              "bridge"
            );
            console.log();
            break;
          case 11:
            console.log(
              "11. Bridge 1 Init to (INIT AI) for Account " + this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(
              BridgeID.INITAI,
              COIN.INIT,
              1,
              "bridge"
            );
            console.log();
            break;
          case 12:
            console.log(
              "12. Send 0.1 TIA to Other (NOON) for Account " +
                this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(
              BridgeID.NOON,
              COIN.TIA,
              0.1,
              "transfer"
            );
            console.log();
            break;
          case 13:
            console.log(
              "13. Send 1 USDC to Other (BLACKWING) for Account " +
                this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(
              BridgeID.BLACKWING,
              COIN.USDC,
              1,
              "transfer"
            );
            console.log();
            break;
          case 14:
            console.log(
              "14. Send 5 TUC to Other (TUCANA) for Account " +
                this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(
              BridgeID.TUCANA,
              COIN.TUCANA,
              5,
              "transfer"
            );
            console.log();
            break;
          case 15:
            console.log(
              "15. Send 0.0001 ETH to Other (MINIMOVE) for Account " +
                this.walletAddress
            );
            await this.initia.sendTokenToOtherLayer(
              BridgeID.MINIMOVE,
              COIN.ETH,
              0.0001,
              "transfer"
            );
            console.log();
            break;
          case 16:
            console.log(
              "16. Swap 1 INIT to USDC for Account " + this.walletAddress
            );
            await this.initia.swap(false, Pair.INITIAUSDC);
            console.log();
            break;
          case 17:
            console.log(
              "17. Swap 1 INIT to TIA for Account " + this.walletAddress
            );
            await this.initia.swap(false, Pair.INITIATIA);
            console.log();
            break;
          case 18:
            console.log(
              "18. Swap 1 INIT to TUC for Account " + this.walletAddress
            );
            await this.initia.swap(false, Pair.INITIATUC);
            console.log();
            break;
          case 19:
            console.log(
              "19. Swap 1 INIT to ETH for Account " + this.walletAddress
            );
            await this.initia.swap(false, Pair.INITIAETH);
            console.log();
            break;
          case 20:
            console.log(
              "20. Stake 0.1 INIT to Omninode Account " + this.walletAddress
            );
            await this.initia.stakeInit();
            console.log();
            break;
          case 21:
            console.log(
              "21. Stake 0.5 USDC / INITIA LP to Omninode Account " +
                this.walletAddress
            );
            await this.initia.stakeInit(Pair.INITIAUSDC);
            console.log();
            break;
          case 22:
            console.log(
              "22. Stake 0.01 TIA / INITIA LP to Omninode Account " +
                this.walletAddress
            );
            await this.initia.stakeInit(Pair.INITIAUSDC);
            console.log();
            break;
          case 23:
            console.log(
              "23. Stake 0.0001 ETH / INITIA LP to Omninode Account " +
                this.walletAddress
            );
            await this.initia.stakeInit(Pair.INITIAETH);
            console.log();
            break;
          case 24:
            console.log("24. Request Faucet for Tucana " + this.walletAddress);
            await this.tucana.requestFaucet(this.walletAddress);
            console.log();
            break;
          case 25:
            console.log(
              "25. Add 1 TUC to Tucana Liquidity PERP " + this.walletAddress
            );
            await this.tucana.tucanaPerpAddLiquidity();
            console.log();
            break;
          case 26:
            console.log(
              "26. Swap 1 INIT to USDC on TUCANA Account " + this.walletAddress
            );
            await this.tucana.swap();
            console.log();
            break;
          case 27:
            console.log(
              "27. Roll Civitia Dice 3x For Account " + this.walletAddress
            );
            for (let x = 0; x < 3; x++) {
              await this.civitia.rollDice();
              console.log();
            }
            break;
          case 28:
            console.log(
              "28. Claim Staking Reward on Omninode for Account " +
                this.walletAddress
            );
            await this.initia.claimStakingReward();
            console.log();
            break;
          case 29:
            console.log(
              "29. Vote a proposal for Account " + this.walletAddress
            );
            await this.initia.vote();
            console.log();
            break;
          case 30:
            console.log(
              "30. Move Initia Stakes from Omninode to Nodes.Guru for Account " +
                this.walletAddress
            );
            await this.initia.moveStake();
            console.log();
            break;
          case 31:
            console.log(
              "31. Add Liquidity INIT/USDC on Tucana Liquidity Pool for Account " +
                this.walletAddress
            );
            await this.tucana.tucanaPoolAddLiquidity();
            console.log();
            break;
          case 32:
            console.log(
              "32. Generate Collection on Init AI for Account " +
                this.walletAddress
            );
            await this.initAi.requestCreateCollection();
            console.log();
            break;
          case 33:
            console.log(
              "33. Mint NFT on Collection Assasin Holding blade NFT Account " +
                this.walletAddress
            );
            await this.initAi.requestMint();
            console.log();
            break;
          default:
            console.log("Number " + number + " is not configured.");
            break;
        }
      } catch (error) {
        reject(error);
      }

      resolve();
    });
  }
}

export { Config };
