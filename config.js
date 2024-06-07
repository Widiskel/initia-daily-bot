import { AppConstant } from "./src/utils/constant.js";
import { Pair } from "./src/utils/enum/pair.js";

class Config {
  constructor(routine, civitia, tucana, address) {
    this.routine = routine;
    this.civitia = civitia;
    this.tucana = tucana;
    this.walletAddress = address;

    // 1. Send 1 Init to Other
    // 2. Send 1 Init to Other (BLACKWING)
    // 3. Send 1 Init to Other (NOON)
    // 4. Send 1 Init to Other (TUCANA)
    // 5. Send 1 Init to Other (INIT AI)
    // 6. Send 1 Init to Other (MINIMOVE)
    // 7. Send 1 Init to Other (MINIWASM)
    // 8. Send 1 Init to Other (CIVITA)
    // 9. Bridge 1 Init to (CIVITA)
    // 10. Send 0.1 TIA to Other (NOON) (EXPERIMENTAL)
    // 11. Send 1 USDC to Other (BLACKWING) (EXPERIMENTAL)
    // 12. Send 5 TUC to Other (TUCANA) (EXPERIMENTAL)
    // 13. Send 0.0001 ETH to Other (MINIMOVE) (EXPERIMENTAL)
    // 14. Swap 1 INIT to USDC
    // 15. Swap 1 INIT to TIA
    // 16. Swap 1 INIT to TUC
    // 17. Swap 1 INIT to ETH
    // 18. Stake 0.1 INIT to Omninode Account
    // 19. Stake 0.5 USDC / INITIA LP to Omninode Account
    // 20. Stake 0.01 TIA / INITIA LP to Omninode Account
    // 21. Stake 0.0001 ETH / INITIA LP to Omninode Account
    // 22. Request Faucet for Tucana Account
    // 23. Add 1 TUC to Tucana Liquidity PERP
    // 24. Swap 1 INIT to USDC on TUCANA Account
    // 25. Roll Civitia Dice 3x For Account
    // 26. Claim Staking Reward on Omninode
    // 27. Vote a proposal on Initia
    // 28. Move Initia Stakes from Omninode to Nodes.Guru
    // 29. Add Liquidity INIT/USDC on Tucana Liquidity Pool

    // MORE TX CONFIG
    // this.config = Array.from({ length: 29 }, (_, i) => i + 1);

    //FOCUS EXP CONFIG
    this.config = [1, 14, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
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
            await this.routine.sendOneInitToOther();
            console.log();
            break;
          case 2:
            console.log(
              "2. Send 1 Init to Other (BLACKWING) for Account " +
                this.walletAddress
            );
            await this.routine.sendTokenToOtherLayer(
              AppConstant.BridgeID.BLACKWING
            );
            console.log();
            break;
          case 3:
            console.log(
              "3. Send 1 Init to Other (NOON) for Account " + this.walletAddress
            );
            await this.routine.sendTokenToOtherLayer(AppConstant.BridgeID.NOON);
            console.log();
            break;
          case 4:
            console.log(
              "4. Send 1 Init to Other (TUCANA) for Account " +
                this.walletAddress
            );
            await this.routine.sendTokenToOtherLayer(
              AppConstant.BridgeID.TUCANA
            );
            console.log();
            break;
          case 5:
            console.log(
              "5. Send 1 Init to Other (INIT AI) for Account " +
                this.walletAddress
            );
            await this.routine.sendTokenToOtherLayer(
              AppConstant.BridgeID.INITAI
            );
            console.log();
            break;
          case 6:
            console.log(
              "6. Send 1 Init to Other (MINIMOVE) for Account " +
                this.walletAddress
            );
            await this.routine.sendTokenToOtherLayer(
              AppConstant.BridgeID.MINIMOVE
            );
            console.log();
            break;
          case 7:
            console.log(
              "7. Send 1 Init to Other (MINIWASM) for Account " +
                this.walletAddress
            );
            await this.routine.sendTokenToOtherLayer(
              AppConstant.BridgeID.MINIWASM
            );
            console.log();
            break;
          case 8:
            console.log(
              "8. Send 1 Init to Other (CIVITA) for Account " +
                this.walletAddress
            );
            await this.routine.sendTokenToOtherLayer(
              AppConstant.BridgeID.CIVITA
            );
            console.log();
            break;
          case 9:
            console.log(
              "9. Bridge 1 Init to (CIVITA) for Account " + this.walletAddress
            );
            await this.routine.sendTokenToOtherLayer(
              AppConstant.BridgeID.CIVITA,
              AppConstant.COIN.INIT,
              1,
              "bridge"
            );
            console.log();
            break;
          case 10:
            console.log(
              "10. Send 0.1 TIA to Other (NOON) for Account " +
                this.walletAddress
            );
            await this.routine.sendTokenToOtherLayer(
              AppConstant.BridgeID.NOON,
              AppConstant.COIN.TIA,
              0.1,
              "transfer"
            );
            console.log();
            break;
          case 11:
            console.log(
              "11. Send 1 USDC to Other (BLACKWING) for Account " +
                this.walletAddress
            );
            await this.routine.sendTokenToOtherLayer(
              AppConstant.BridgeID.BLACKWING,
              AppConstant.COIN.USDC,
              1,
              "transfer"
            );
            console.log();
            break;
          case 12:
            console.log(
              "12. Send 5 TUC to Other (TUCANA) for Account " +
                this.walletAddress
            );
            await this.routine.sendTokenToOtherLayer(
              AppConstant.BridgeID.TUCANA,
              AppConstant.COIN.TUCANA,
              5,
              "transfer"
            );
            console.log();
            break;
          case 13:
            console.log(
              "13. Send 0.0001 ETH to Other (MINIMOVE) for Account " +
                this.walletAddress
            );
            await this.routine.sendTokenToOtherLayer(
              AppConstant.BridgeID.MINIMOVE,
              AppConstant.COIN.ETH,
              0.0001,
              "transfer"
            );
            console.log();
            break;
          case 14:
            console.log(
              "14. Swap 1 INIT to USDC for Account " + this.walletAddress
            );
            await this.routine.swap(false, Pair.INITIAUSDC);
            console.log();
            break;
          case 15:
            console.log(
              "15. Swap 1 INIT to TIA for Account " + this.walletAddress
            );
            await this.routine.swap(false, Pair.INITIATIA);
            console.log();
            break;
          case 16:
            console.log(
              "16. Swap 1 INIT to TUC for Account " + this.walletAddress
            );
            await this.routine.swap(false, Pair.INITIATUC);
            console.log();
            break;
          case 17:
            console.log(
              "17. Swap 1 INIT to ETH for Account " + this.walletAddress
            );
            await this.routine.swap(false, Pair.INITIAETH);
            console.log();
            break;
          case 18:
            console.log(
              "18. Stake 0.1 INIT to Omninode Account " + this.walletAddress
            );
            await this.routine.stakeInit();
            console.log();
            break;
          case 19:
            console.log(
              "19. Stake 0.5 USDC / INITIA LP to Omninode Account " +
                this.walletAddress
            );
            await this.routine.stakeInit(Pair.INITIAUSDC);
            console.log();
            break;
          case 20:
            console.log(
              "20. Stake 0.01 TIA / INITIA LP to Omninode Account " +
                this.walletAddress
            );
            await this.routine.stakeInit(Pair.INITIAUSDC);
            console.log();
            break;
          case 21:
            console.log(
              "21. Stake 0.0001 ETH / INITIA LP to Omninode Account " +
                this.walletAddress
            );
            await this.routine.stakeInit(Pair.INITIAETH);
            console.log();
            break;
          case 22:
            console.log("22. Request Faucet for Tucana " + this.walletAddress);
            await getTucanaFaucet(this.walletAddress);
            console.log();
            break;
          case 23:
            console.log(
              "23. Add 1 TUC to Tucana Liquidity PERP " + this.walletAddress
            );
            await this.tucana.tucanaPerpAddLiquidity();
            console.log();
            break;
          case 24:
            console.log(
              "24. Swap 1 INIT to USDC on TUCANA Account " + this.walletAddress
            );
            await this.tucana.swap();
            console.log();
            break;
          case 25:
            console.log(
              "25. Roll Civitia Dice 3x For Account " + this.walletAddress
            );
            for (let x = 0; x < 3; x++) {
              await this.civitia.rollDice();
              console.log();
            }
            break;
          case 26:
            console.log(
              "26. Claim Staking Reward on Omninode for Account " +
                this.walletAddress
            );
            await this.routine.claimStakingReward();
            console.log();
            break;
          case 27:
            console.log(
              "27. Vote a proposal for Account " + this.walletAddress
            );
            await this.routine.vote();
            console.log();
            break;
          case 28:
            console.log(
              "28. Move Initia Stakes from Omninode to Nodes.Guru for Account " +
                this.walletAddress
            );
            await this.routine.moveStakes();
            console.log();
            break;
          case 29:
            console.log(
              "29. Add Liquidity INIT/USDC on Tucana Liquidity Pool for Account " +
                this.walletAddress
            );
            await this.tucana.tucanaPoolAddLiquidity();
            console.log();
            break;
          default:
            console.log("Number " + number + " is not configured.");
        }
      } catch (error) {
        reject(error);
      }

      resolve();
    });
  }
}

export { Config };
