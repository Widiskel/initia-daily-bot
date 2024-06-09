import * as initia from "@initia/initia.js";
import { AppConstant } from "../../utils/constant.js";
import { Pair } from "../../utils/enum/pair.js";
import {
  generateTokenInfo,
  getChannel,
  getMetadataAndPair,
  getTimestamp,
} from "../../utils/helper.js";
import { COIN } from "../../utils/enum/coin.js";
import { InitiaSigner } from "./operation/signer.js";
import { BridgeID } from "../../utils/enum/bridge.js";
import { InitiaException } from "./exception/exception.js";
import { getLatestProposal } from "../../repository/initia_repo.js";

/**
 * Initia class.
 *
 * Author : Widiskel
 *
 */
class Initia extends InitiaSigner {
  constructor(address, pk) {
    const chainId = "initiation-1";
    const privateKeyBytes = Buffer.from(pk, "hex");
    const key = new initia.RawKey(Uint8Array.from(privateKeyBytes));
    const lcd = new initia.LCDClient(`https://lcd.${chainId}.initia.xyz`, {
      chainId: chainId,
      gasPrices: `0.15${COIN.GAS}`,
      gasAdjustment: "2.0",
    });
    const wallet = new initia.Wallet(lcd, key);

    super(wallet, lcd, chainId);
    this.chainId = this.chainId;
    this.key = key;
    this.lcd = lcd;
    this.wallet = wallet;
    this.address = address;

    /** @type {InitiaException} */
    this.exception = new InitiaException(this);
  }

  async queryBalance(coin) {
    try {
      const balances = await this.lcd.bank.balance(this.address);
      const coinList = Object.keys(balances[0]._coins);
      coinList.forEach((coin) => {
        console.log(
          `${balances[0]._coins[coin].amount / 1000000} ${COIN.getCoinByValue(
            balances[0]._coins[coin].denom
          )}`
        );
      });

      console.log();
      if (balances[0]._coins[coin]) {
        return balances[0]._coins[coin].amount;
      } else {
        return 0;
      }
    } catch (error) {
      console.error("Error during checking balance:", error);
      throw error;
    }
  }

  async checkGas() {
    try {
      const balances = await this.lcd.bank.balance(this.address);
      console.log();
      if (balances[0]._coins[COIN.GAS]) {
        return balances[0]._coins[COIN.GAS].amount;
      } else {
        return 0;
      }
    } catch (error) {
      console.error("Error during checking balance:", error);
      throw error;
    }
  }

  async swap(oneWaySwap, pair) {
    try {
      const [liq, firstMetadata, secMetadata] = generateTokenInfo(
        pair,
        oneWaySwap,
        this.address
      );

      //First
      var args = [
        initia.bcs.address().serialize(liq).toBase64(),
        initia.bcs.address().serialize(firstMetadata).toBase64(),
        initia.bcs.u64().serialize(1000000).toBase64(), // 1 INITIA
      ];
      const firstSim = await this.lcd.move.viewFunction(
        "0x1",
        "dex",
        "get_swap_simulation",
        [],
        args
      );

      args.push(
        initia.bcs.option(initia.bcs.u64()).serialize(firstSim).toBase64()
      );

      const firstMsg = new initia.MsgExecute();
      firstMsg.function_name = "swap_script";
      firstMsg.module_address = "0x1";
      firstMsg.module_name = "dex";
      firstMsg.sender = this.address;
      firstMsg.args = args;

      await this.signAndBroadcast(firstMsg)
        .then(() => {
          console.log(
            `Successfully Swap 1 To ${
              firstSim / 1000000
            } with Pair ${pair} for Address : ${this.address}`
          );
          console.log();
        })
        .catch((err) => {
          throw err;
        });

      if (oneWaySwap != true) {
        // SECOND
        args = [
          initia.bcs.address().serialize(liq).toBase64(),
          initia.bcs.address().serialize(secMetadata).toBase64(),
          initia.bcs.u64().serialize(firstSim).toBase64(), // SWAPPED TOKEN
        ];
        const secondSim = await this.lcd.move.viewFunction(
          "0x1",
          "dex",
          "get_swap_simulation",
          [],
          args
        );
        args.push(
          initia.bcs.option(initia.bcs.u64()).serialize(secondSim).toBase64()
        );

        const secondMsg = new initia.MsgExecute();
        secondMsg.function_name = "swap_script";
        secondMsg.module_address = "0x1";
        secondMsg.module_name = "dex";
        secondMsg.sender = this.address;
        secondMsg.type_args = [];
        secondMsg.args = args;
        // console.log(secondMsg);

        await this.signAndBroadcast(secondMsg)
          .then(() => {
            console.log(
              `Successfully Swap Back ${pair} for Address : ${this.address}`
            );
          })
          .catch((err) => {
            throw err;
          });
      }
    } catch (error) {
      await this.exception.handlingError(error, "swap", pair);
    }
  }

  async sendOneInitToOther() {
    try {
      console.log(`Sending 1 init to ${AppConstant.RECEIVERWALLETADDRESS}`);
      const msg = new initia.MsgSend(
        this.address, // sender address
        AppConstant.RECEIVERWALLETADDRESS, // recipient address
        "1000000uinit" // 1 Init
      );

      await this.signAndBroadcast(msg)
        .then(() => {
          console.log(
            `Successfully Send 1 Init To ${AppConstant.RECEIVERWALLETADDRESS}`
          );
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw this.exception.handlingError(error, "sendOneInitToOther");
    }
  }

  async transferToken(bridgeId, coin = COIN.INIT, amount = 1) {
    try {
      console.log("Checking Balance");
      var balance = await this.queryBalance(coin);

      console.log(
        `${coin} Balance : ${balance / 1000000} ${COIN.getCoinByValue(
          coin
        )} | required ${amount} ${COIN.getCoinByValue(coin)}`
      );

      while (balance < amount * 1000000) {
        console.log("Swap and check Balance");
        if (coin == COIN.ETH) {
          await this.swap(true, Pair.INITIAETH);
        } else if (coin == COIN.USDC) {
          await this.swap(true, Pair.INITIAUSDC);
        } else if (coin == COIN.TUCANA) {
          await this.swap(true, Pair.INITIATUC);
        } else if (coin == COIN.TIA) {
          await this.swap(true, Pair.INITIATIA);
        }
        balance = await this.queryBalance(coin);
        console.log(
          `${coin} Balance : ${balance / 1000000} ${COIN.getCoinByValue(
            coin
          )} | required ${amount} ${COIN.getCoinByValue(coin)}`
        );
      }

      console.log(
        `Sending ${amount} ${coin} to ${
          AppConstant.RECEIVERWALLETADDRESS
        } on ${BridgeID.getBridgeByValue(bridgeId)}`
      );

      const msg = new initia.MsgTransfer(
        "transfer",
        getChannel(coin),
        initia.Coin.fromString(`${amount * 1000000}${coin}`),
        this.address,
        AppConstant.RECEIVERWALLETADDRESS,
        new initia.Height(0, 0),
        getTimestamp(coin)
      );

      // console.log(msg);
      await this.signAndBroadcast(msg)
        .then(() => {
          console.log(
            `Successfully Send ${amount} ${COIN.getCoinByValue(coin)} To ${
              AppConstant.RECEIVERWALLETADDRESS
            } From ${BridgeID.getBridgeByValue(bridgeId)} Layer`
          );
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async sendTokenDifferentLayer(bridgeId, coin = COIN.INIT, amount = 1) {
    try {
      console.log(
        `Sending ${amount} ${coin} to ${
          AppConstant.RECEIVERWALLETADDRESS
        } on ${BridgeID.getBridgeByValue(bridgeId)}`
      );
      const msg = new initia.MsgInitiateTokenDeposit();
      msg.bridge_id = bridgeId;
      msg.amount = initia.Coin.fromString(`${amount * 1000000}${coin}`);
      msg.sender = this.address;
      msg.to = AppConstant.RECEIVERWALLETADDRESS;
      await this.signAndBroadcast(msg)
        .then(() => {
          console.log(
            `Successfully Send ${amount} ${COIN.getCoinByValue(coin)} To ${
              AppConstant.RECEIVERWALLETADDRESS
            } From ${BridgeID.getBridgeByValue(bridgeId)} Layer`
          );
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async mixedRouteSwapTransfer(bridgeId, coin = COIN.INIT, amount) {
    const [metadata, pair] = getMetadataAndPair(coin);

    console.log();
    console.log("Checking Balance");
    var balance = await this.queryBalance(coin);

    console.log(
      `${coin} Balance : ${balance / 1000000} ${COIN.getCoinByValue(
        coin
      )} | required ${amount} ${COIN.getCoinByValue(coin)}`
    );

    while (balance < amount * 1000000) {
      console.log("Swap and check Balance");
      await this.swap(true, pair);
      balance = await this.queryBalance(coin);
      console.log(
        `${coin} Balance : ${balance / 1000000} ${COIN.getCoinByValue(
          coin
        )} | required ${amount} ${COIN.getCoinByValue(coin)}`
      );
    }
    try {
      console.log(
        `Sending ${amount} ${coin} to ${
          AppConstant.RECEIVERWALLETADDRESS
        } ${BridgeID.getBridgeByValue(bridgeId)}`
      );
      const brigeArgs = [
        initia.bcs.address().serialize(metadata).toBase64(),
        "AA==",
        initia.bcs
          .u64()
          .serialize(amount * 1000000)
          .toBase64(),
      ];
      console.log(brigeArgs);
      const initToInit = await lcd.move.viewFunction(
        AppConstant.BRIDGEMODULEADDRESS,
        "swap_transfer",
        "mixed_route_swap_simulation",
        [],
        brigeArgs
      );
      console.log(initToInit);

      const msg = new initia.MsgExecute();
      msg.function_name = "mixed_route_swap_transfer";
      msg.module_address = AppConstant.BRIDGEMODULEADDRESS;
      msg.module_name = "swap_transfer";
      msg.sender = this.address;
      msg.type_args = [];
      msg.args = [
        initia.bcs.address().serialize(metadata).toBase64(),
        "AA==",
        initia.bcs.u64().serialize(initToInit).toBase64(),
        initia.bcs.option(initia.bcs.u64()).serialize(initToInit).toBase64(),
        // initia.bcs.u64().serialize(bridgeId).toBase64(),
        initia.bcs.string().serialize(this.address).toBase64(),
        initia.bcs.string().serialize("transfer").toBase64(),
        initia.bcs.string().serialize(getChannel(coin)).toBase64(),
        "AA==",
      ];

      await this.signAndBroadcast(msg)
        .then(() => {
          console.log(
            `Successfully Send ${amount} ${COIN.getCoinByValue(coin)} To ${
              AppConstant.RECEIVERWALLETADDRESS
            } on ${BridgeID.getBridgeByValue(bridgeId)}`
          );
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async sendTokenToOtherLayer(
    bridgeId,
    coin = COIN.INIT,
    amount = 1,
    method = ""
  ) {
    try {
      if (method == "") {
        await this.sendTokenDifferentLayer(bridgeId, coin, amount);
      } else if (method == "bridge") {
        await this.bridge(bridgeId, coin, amount);
      } else if (method == "transfer") {
        await this.transferToken(bridgeId, coin, amount);
      }
    } catch (error) {
      await this.exception.handlingError(error, "sendTokenToOtherLayer", [
        bridgeId,
        coin,
        amount,
        method,
      ]);
    }
  }

  async stakeInit() {
    try {
      console.log("Stake 1 INITIA to OmniNode for Account " + this.address);
      // Args INITIA > USDC
      const msg = new initia.MsgDelegate();
      msg.delegator_address = this.address;
      msg.validator_address = AppConstant.OMNINODEVALIDATORADDRESS;
      msg.amount = initia.Coins.fromString("1000000uinit");

      await this.signAndBroadcast(msg)
        .then(() => {
          console.log(
            `Successfully Stake 1 Initia to OmniNode for Address : ${this.address}`
          );
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      await this.exception.handlingError(error, "stake", Pair.INIT);
    }
  }

  async stakeInitUsdc() {
    try {
      console.log(
        `Stake 0.5 USDC / INITIA LP to OmniNode for Account ${this.address}`
      );

      await this.swap(true, Pair.INITIAUSDC)
        .then(async (data) => {
          const simulate = await lcd.move.viewFunction(
            AppConstant.BRIDGEMODULEADDRESS,
            "dex_utils",
            "single_asset_provide_liquidity_cal",
            [],
            [
              initia.bcs
                .address()
                .serialize(AppConstant.INITIAUSDCLIQUIDITYADDRESS)
                .toBase64(),
              initia.bcs
                .address()
                .serialize(AppConstant.USDCMETADATAADDRESS)
                .toBase64(),
              initia.bcs
                .u64()
                .serialize(0.1 * 1000000)
                .toBase64(),
            ]
          );

          const msg = new initia.MsgExecute();
          msg.function_name = "single_asset_provide_stake";
          msg.module_address = AppConstant.BRIDGEMODULEADDRESS;
          msg.sender = this.address;
          msg.module_name = "dex_utils";
          msg.args = [
            initia.bcs
              .address()
              .serialize(AppConstant.INITIAUSDCLIQUIDITYADDRESS)
              .toBase64(),
            initia.bcs
              .address()
              .serialize(AppConstant.USDCMETADATAADDRESS)
              .toBase64(),
            initia.bcs
              .u64()
              .serialize(0.5 * 1000000)
              .toBase64(),
            initia.bcs
              .option(initia.bcs.u64())
              .serialize(simulate[0])
              .toBase64(),
            initia.bcs
              .string()
              .serialize(AppConstant.OMNINODEVALIDATORADDRESS)
              .toBase64(),
          ];

          await this.signAndBroadcast(msg)
            .then(() => {
              console.log(
                `Successfully Stake 0.5 USDC / INITIA LP to OmniNode for Address : ${this.address}`
              );
            })
            .catch((err) => {
              // console.log(err.response.data.message);
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async stakeTiaInitia() {
    try {
      console.log(
        `Stake 0.01 TIA / INITIA LP to OmniNode for Account ${this.address}`
      );

      await this.swap(true, Pair.INITIATIA)
        .then(async (data) => {
          const simulate = await lcd.move.viewFunction(
            AppConstant.BRIDGEMODULEADDRESS,
            "dex_utils",
            "single_asset_provide_liquidity_cal",
            [],
            [
              initia.bcs
                .address()
                .serialize(AppConstant.INITIATIALIQUIDITYADDRESS)
                .toBase64(),
              initia.bcs
                .address()
                .serialize(AppConstant.TIAMETADATAADRESS)
                .toBase64(),
              initia.bcs
                .u64()
                .serialize(0.01 * 1000000)
                .toBase64(),
            ]
          );

          const msg = new initia.MsgExecute();
          msg.function_name = "single_asset_provide_stake";
          msg.module_address = AppConstant.BRIDGEMODULEADDRESS;
          msg.sender = this.address;
          msg.module_name = "dex_utils";
          msg.args = [
            initia.bcs
              .address()
              .serialize(AppConstant.INITIATIALIQUIDITYADDRESS)
              .toBase64(),
            initia.bcs
              .address()
              .serialize(AppConstant.TIAMETADATAADRESS)
              .toBase64(),
            initia.bcs
              .u64()
              .serialize(0.01 * 1000000)
              .toBase64(),
            initia.bcs
              .option(initia.bcs.u64())
              .serialize(simulate[0])
              .toBase64(),
            initia.bcs
              .string()
              .serialize(AppConstant.OMNINODEVALIDATORADDRESS)
              .toBase64(),
          ];

          await this.signAndBroadcast(msg)
            .then(() => {
              console.log(
                `Successfully Stake 0.01 TIA / INITIA LP to OmniNode for Address : ${this.address}`
              );
            })
            .catch((err) => {
              // console.log(err.response.data.message);
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async stakeEthInitia() {
    try {
      console.log(
        `Stake 0.0001 ETH / INITIA LP to OmniNode for Account ${this.address}`
      );

      await this.swap(true, Pair.INITIAETH)
        .then(async (data) => {
          const simulate = await lcd.move.viewFunction(
            AppConstant.BRIDGEMODULEADDRESS,
            "dex_utils",
            "single_asset_provide_liquidity_cal",
            [],
            [
              initia.bcs
                .address()
                .serialize(AppConstant.INITIAETHLIQUIDITYADDRESS)
                .toBase64(),
              initia.bcs
                .address()
                .serialize(AppConstant.ETHMETADATAADRESS)
                .toBase64(),
              initia.bcs
                .u64()
                .serialize(0.0001 * 1000000)
                .toBase64(),
            ]
          );

          const msg = new initia.MsgExecute();
          msg.function_name = "single_asset_provide_stake";
          msg.module_address = AppConstant.BRIDGEMODULEADDRESS;
          msg.sender = this.address;
          msg.module_name = "dex_utils";
          msg.args = [
            initia.bcs
              .address()
              .serialize(AppConstant.INITIAETHLIQUIDITYADDRESS)
              .toBase64(),
            initia.bcs
              .address()
              .serialize(AppConstant.ETHMETADATAADRESS)
              .toBase64(),
            initia.bcs
              .u64()
              .serialize(0.0001 * 1000000)
              .toBase64(),
            initia.bcs
              .option(initia.bcs.u64())
              .serialize(simulate[0])
              .toBase64(),
            initia.bcs
              .string()
              .serialize(AppConstant.OMNINODEVALIDATORADDRESS)
              .toBase64(),
          ];

          await this.signAndBroadcast(msg)
            .then(() => {
              console.log(
                `Successfully Stake 0.01 ETH / INITIA LP to OmniNode for Address : ${this.address}`
              );
            })
            .catch((err) => {
              // console.log(err.response.data.message);
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async stake(pair = Pair.INIT) {
    try {
      if (pair == Pair.INITIAUSDC) {
        await this.stakeInitUsdc();
      } else if (pair == Pair.INITIATIA) {
        await this.stakeTiaInitia();
      } else if (pair == Pair.INITIAETH) {
        await this.stakeEthInitia();
      } else {
        await this.stakeInit();
      }
    } catch (error) {
      await this.exception.handlingError(error, "stake", pair);
    }
  }

  async bridge(bridgeId, coin, amount) {
    try {
      console.log(`Bridging 1 init to ${AppConstant.RECEIVERWALLETADDRESS}`);
      const msg = new initia.MsgInitiateTokenDeposit(
        this.address, // sender address
        bridgeId,
        AppConstant.RECEIVERWALLETADDRESS, // recipient address
        initia.Coin.fromString(`${amount}${coin}`)
      );

      // console.log(msg);

      await this.signAndBroadcast(msg)
        .then(() => {
          console.log(
            `Successfully Bridge 1 Init To ${
              AppConstant.RECEIVERWALLETADDRESS
            } on ${BridgeID.getBridgeByValue(bridgeId)}`
          );
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      await this.exception.handlingError(error, "bridge", [
        bridgeId,
        coin,
        amount,
      ]);
    }
  }

  async vote() {
    try {
      const proposals = await getLatestProposal();
      console.log(
        `Vote Proposal with Proposal ID ${proposals.id} (${proposals.title}), with Option YES`
      );
      const msg = new initia.MsgVote(
        proposals.id, //proposal id
        this.address,
        1 // vote optioin
      );

      // console.log(msg);

      await this.signAndBroadcast(msg)
        .then(() => {
          console.log(
            `Successfully Vote a Proposal ID ${proposals.id} (${proposals.title})`
          );
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      this.exception.handlingError(error, "vote");
    }
  }

  async claimStakingReward() {
    try {
      console.log(`Claiming Staking reward on Omninode`);
      const msg = new initia.MsgWithdrawDelegatorReward(
        this.address,
        AppConstant.OMNINODEVALIDATORADDRESS
      );

      await this.signAndBroadcast(msg)
        .then(() => {
          console.log(
            `Successfully Claim Staking Reward on Omninode Validator`
          );
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      await this.exception.handlingError(error, "claimStakingReward");
    }
  }

  async moveStake() {
    try {
      console.log(`Move Stakes From Omninode to Nodes.Guru`);
      const msg = new initia.MsgBeginRedelegate(
        this.address,
        AppConstant.OMNINODEVALIDATORADDRESS,
        AppConstant.NODESGURUVALIDATORADDRESS,
        `100000uinit`
      );

      await this.signAndBroadcast(msg)
        .then(() => {
          console.log(
            `Successfully Move 0.1 INIT Stakes from Omninode to Nodes.Guru for Account ${this.address}`
          );
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      await this.exception.handlingError(error, "moveStake");
    }
  }
}

export { Initia };
