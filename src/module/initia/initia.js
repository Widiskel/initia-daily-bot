import * as initia from "@initia/initia.js";
import * as initiaRepo from "../../repository/initia_repo.js";
import { AppConstant } from "../../utils/constant.js";
import { Pair } from "../../utils/enum/pair.js";

let lcd;
let chainId;
let minGasPrice;
let key;
let address;
let wallet;

async function initiation(walletAddress, pk) {
  try {
    const initiation = await initiaRepo.getInitiation();
    chainId = initiation.chain_id;
    minGasPrice = initiation.fees.fee_tokens[0].fixed_min_gas_price;
    const privateKeyBytes = Buffer.from(pk, "hex");

    key = new initia.RawKey(Uint8Array.from(privateKeyBytes));
    lcd = new initia.LCDClient(`https://lcd.${chainId}.initia.xyz`, {
      chainId: chainId,
      gasPrices: minGasPrice + AppConstant.COIN.GAS,
      gasAdjustment: "2.0",
    });
    wallet = new initia.Wallet(lcd, key);
    address = walletAddress;

    return initiation;
  } catch (error) {
    console.error("Error during initiation:", error);
    throw error;
  }
}

async function queryBalance() {
  try {
    const balances = await lcd.bank.balance(address);
    const coinList = Object.keys(balances[0]._coins);
    coinList.forEach((coin) => {
      console.log(
        `${
          balances[0]._coins[coin].amount / 1000000
        } ${AppConstant.getCoinByValue(balances[0]._coins[coin].denom)}`
      );
    });

    console.log();
    if (balances[0]._coins.uinit) {
      return balances[0]._coins.uinit.amount;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error during checking balance:", error);
    throw error;
  }
}

async function checkGas() {
  try {
    const balances = await lcd.bank.balance(address);
    console.log();
    if (balances[0]._coins[AppConstant.COIN.GAS]) {
      return balances[0]._coins[AppConstant.COIN.GAS].amount;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error during checking balance:", error);
    throw error;
  }
}

async function claimExp() {
  try {
    console.log(address);
    const stage = await initiaRepo.getStageInfo();
    const referalPoint = await initiaRepo.getReferalPoint();

    const msg = new initia.MsgExecute();
    msg.function_name = "claim_point";
    msg.module_address = AppConstant.CLAIMPOINTMODULEADDRESS;
    msg.module_name = "initia_xp";
    msg.sender = address;
    msg.type_args = [];
    msg.args = [
      initia.bcs
        .u64()
        .serialize(JSON.parse(stage.data).current_stage)
        .toBase64(),
      initia.bcs.address().serialize(address).toBase64(),
      initia.bcs.u64().serialize(50).toBase64(),
      initia.bcs.u64().serialize(referalPoint.referral_point).toBase64(),
    ];
    console.log(msg);
    // [
    //     STAGE
    //     UNKNOWN
    //     AMOUNT
    //     REFERAL POINT AMMOUNT
    // ]

    await signAndBroadcast(msg);
  } catch (error) {
    throw error;
  }
}

async function sendToken() {
  try {
    console.log(`Sending 1 init to ${AppConstant.RECEIVERTESTNETADDRESS}`);
    const msg = new initia.MsgSend(
      address, // sender address
      AppConstant.RECEIVERTESTNETADDRESS, // recipient address
      "1000000uinit" // 1 Init
    );

    await signAndBroadcast(msg)
      .then(() => {
        console.log(
          `Successfully Send 1 Init To ${AppConstant.RECEIVERTESTNETADDRESS}`
        );
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    throw error;
  }
}
async function sendTokenDifferentLayer(bridgeId) {
  try {
    console.log(`Sending 1 init to ${AppConstant.RECEIVERTESTNETADDRESS}`);
    const msg = new initia.MsgInitiateTokenDeposit();
    msg.bridge_id = bridgeId;
    msg.amount = initia.Coin.fromString("1000000uinit");
    msg.sender = address;
    msg.to = AppConstant.RECEIVERTESTNETADDRESS;
    await signAndBroadcast(msg)
      .then(() => {
        console.log(
          `Successfully Send 1 Init To ${AppConstant.RECEIVERTESTNETADDRESS} From Different Layer`
        );
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    throw error;
  }
}

async function mixed_route_swap_transfer(bridgeId) {
  console.log("BRIDGE ID" + bridgeId);
  try {
    console.log(`Sending 1 init to ${AppConstant.RECEIVERTESTNETADDRESS}`);
    const brigeArgs = [
      initia.bcs
        .address()
        .serialize(AppConstant.INITIAMETADATAADDRESS)
        .toBase64(),
      "AA==",
      initia.bcs.u64().serialize(1).toBase64(),
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
    msg.function_name = "mixed_route_swap_deposit";
    msg.module_address = AppConstant.BRIDGEMODULEADDRESS;
    msg.module_name = "swap_transfer";
    msg.sender = address;
    msg.args = [
      initia.bcs
        .address()
        .serialize(AppConstant.INITIAMETADATAADDRESS)
        .toBase64(),
      "AA==",
      initia.bcs.u64().serialize(1000000).toBase64(),
      "AbguDwAAAAAA",
      initia.bcs.u64().serialize(bridgeId).toBase64(),
      initia.bcs.address().serialize(address).toBase64(),
      "AA==",
    ];

    console.log(AppConstant.getKey(bridgeId));
    console.log(msg);

    await signAndBroadcast(msg)
      .then(() => {
        console.log(
          `Successfully Send 1 Init To ${AppConstant.RECEIVERTESTNETADDRESS} From Different Layer`
        );
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    throw error;
  }
}

async function swap(oneWaySwap, pair) {
  try {
    let liq;
    let firstMetadata;
    let secMetadata;

    console.log("PAIR" + pair);

    if (pair == Pair.INITIATIA) {
      console.log(
        `Swapping 1 INITIA to TIA ${
          !oneWaySwap ? "& TIA to INITIA" : ""
        } for Account ${address}`
      );
      firstMetadata = AppConstant.INITIAMETADATAADDRESS;
      secMetadata = AppConstant.TIAMETADATAADRESS;
      liq = AppConstant.INITIATIALIQUIDITYADDRESS;
    } else if (pair == Pair.INITIAUSDC) {
      console.log(
        `Swapping 1 INITIA to USDC ${
          !oneWaySwap ? "& USDC to INITIA" : ""
        } for Account ${address}`
      );
      firstMetadata = AppConstant.INITIAMETADATAADDRESS;
      secMetadata = AppConstant.USDCMETADATAADDRESS;
      liq = AppConstant.INITIAUSDCLIQUIDITYADDRESS;
    } else if (pair == Pair.INITIAETH) {
      console.log(
        `Swapping 1 INITIA to ETH ${
          !oneWaySwap ? "& ETH to INITIA" : ""
        } for Account ${address}`
      );
      firstMetadata = AppConstant.INITIAMETADATAADDRESS;
      secMetadata = AppConstant.ETHMETADATAADRESS;
      liq = AppConstant.INITIAETHLIQUIDITYADDRESS;
    }

    //First
    var args = [
      initia.bcs.address().serialize(liq).toBase64(),
      initia.bcs.address().serialize(firstMetadata).toBase64(),
      initia.bcs.u64().serialize(1000000).toBase64(), // 1 INITIA
    ];
    const firstSim = await lcd.move.viewFunction(
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
    firstMsg.sender = address;
    firstMsg.args = args;

    await signAndBroadcast(firstMsg)
      .then(() => {
        console.log(
          `Successfully Swap 1 To ${
            firstSim / 1000000
          } with Pair ${pair} for Address : ${address}`
        );
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
      const secondSim = await lcd.move.viewFunction(
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
      secondMsg.sender = address;
      secondMsg.type_args = [];
      secondMsg.args = args;
      // console.log(secondMsg);

      await signAndBroadcast(secondMsg)
        .then(() => {
          console.log(
            `Successfully Swap Back ${pair} for Address : ${address}`
          );
        })
        .catch((err) => {
          throw err;
        });
    }
  } catch (error) {
    throw error;
  }
}
async function stakeInit() {
  try {
    console.log("Stake 0.1 INITIA to OmniNode for Account " + address);
    // Args INITIA > USDC
    var args = [
      initia.bcs
        .address()
        .serialize(AppConstant.INITIAUSDCLIQUIDITYADDRESS)
        .toBase64(),
      initia.bcs
        .address()
        .serialize(AppConstant.INITIAMETADATAADDRESS)
        .toBase64(),
      initia.bcs.u64().serialize(1000000).toBase64(), // 1 INITIA
    ];

    const msg = new initia.MsgDelegate();
    msg.delegator_address = address;
    msg.amount = initia.Coins.fromString("100000uinit");
    msg.validator_address = AppConstant.OMNINODEVALIDATORADDRESS;

    await signAndBroadcast(msg)
      .then(() => {
        console.log(
          `Successfully Stake 0.1 Initia to OmniNode for Address : ${address}`
        );
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    throw error;
  }
}

async function stakeInitUsdc() {
  try {
    console.log(
      `Stake 0.5 USDC / INITIA LP to OmniNode for Account ${address}`
    );

    await swap(true, Pair.INITIAUSDC)
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
        msg.sender = address;
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
          initia.bcs.option(initia.bcs.u64()).serialize(simulate[0]).toBase64(),
          initia.bcs
            .string()
            .serialize(AppConstant.OMNINODEVALIDATORADDRESS)
            .toBase64(),
        ];

        await signAndBroadcast(msg)
          .then(() => {
            console.log(
              `Successfully Stake 0.5 USDC / INITIA LP to OmniNode for Address : ${address}`
            );
          })
          .catch((err) => {
            console.log(err.response.data.message);
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
async function stakeTiaInitia() {
  try {
    console.log(
      `Stake 0.01 TIA / INITIA LP to OmniNode for Account ${address}`
    );

    await swap(true, Pair.INITIATIA)
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
        msg.sender = address;
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
          initia.bcs.option(initia.bcs.u64()).serialize(simulate[0]).toBase64(),
          initia.bcs
            .string()
            .serialize(AppConstant.OMNINODEVALIDATORADDRESS)
            .toBase64(),
        ];

        await signAndBroadcast(msg)
          .then(() => {
            console.log(
              `Successfully Stake 0.01 TIA / INITIA LP to OmniNode for Address : ${address}`
            );
          })
          .catch((err) => {
            console.log(err.response.data.message);
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
async function stakeEthInitia() {
  try {
    console.log(
      `Stake 0.0001 ETH / INITIA LP to OmniNode for Account ${address}`
    );

    await swap(true, Pair.INITIAETH)
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
        msg.sender = address;
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
          initia.bcs.option(initia.bcs.u64()).serialize(simulate[0]).toBase64(),
          initia.bcs
            .string()
            .serialize(AppConstant.OMNINODEVALIDATORADDRESS)
            .toBase64(),
        ];

        await signAndBroadcast(msg)
          .then(() => {
            console.log(
              `Successfully Stake 0.01 ETH / INITIA LP to OmniNode for Address : ${address}`
            );
          })
          .catch((err) => {
            console.log(err.response.data.message);
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

async function signAndBroadcast(msg) {
  try {
    const signedTx = await wallet.createAndSignTx({
      msgs: [msg],
    });
    console.log("TX Signature : ", signedTx.signatures[0]);
    const broadcastResult = await lcd.tx.broadcast(signedTx);
    console.log("TX Hash : ", broadcastResult.txhash);
    console.log(
      `Explorer : https://scan.testnet.initia.xyz/initiation-1/txs/${broadcastResult.txhash}`
    );
  } catch (error) {
    throw error;
  }
}

export {
  initiation,
  queryBalance,
  claimExp,
  sendToken,
  swap,
  sendTokenDifferentLayer,
  signAndBroadcast,
  checkGas,
  stakeInit,
  stakeInitUsdc,
  stakeTiaInitia,
  stakeEthInitia,
  lcd,
};
