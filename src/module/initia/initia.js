import * as initia from "@initia/initia.js";
import * as initiaRepo from "../../repository/initia_repo.js";
import { AppConstant } from "../../utils/constant.js";

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
    return balances[0]._coins.uinit;
  } catch (error) {
    console.error("Error during checking balance:", error);
    throw error;
  }
}

async function checkGas() {
  try {
    const balances = await lcd.bank.balance(address);
    console.log();
    return balances[0]._coins[AppConstant.COIN.GAS];
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

async function swap(oneWaySwap) {
  try {
    console.log(
      "Swapping 1 INITIA to USDC & USDC to INITIA for Account " + address
    );
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
    const initToUsdcSimulation = await lcd.move.viewFunction(
      "0x1",
      "dex",
      "get_swap_simulation",
      [],
      args
    );
    // console.log(initToUsdcSimulation);

    args.push(
      initia.bcs
        .option(initia.bcs.u64())
        .serialize(initToUsdcSimulation)
        .toBase64()
    );

    const initiaToUsdcMsg = new initia.MsgExecute();
    initiaToUsdcMsg.function_name = "swap_script";
    initiaToUsdcMsg.module_address = "0x1";
    initiaToUsdcMsg.module_name = "dex";
    initiaToUsdcMsg.sender = address;
    initiaToUsdcMsg.args = args;
    // console.log(initiaToUsdcMsg);
    await signAndBroadcast(initiaToUsdcMsg)
      .then(() => {
        console.log(
          `Successfully Swap 1 Init To ${
            initToUsdcSimulation / 1000000
          } USDC for Address : ${address}`
        );
      })
      .catch((err) => {
        throw err;
      });

    if (oneWaySwap != true) {
      // Args USDC > INIT
      args = [
        initia.bcs
          .address()
          .serialize(AppConstant.INITIAUSDCLIQUIDITYADDRESS)
          .toBase64(),
        initia.bcs
          .address()
          .serialize(AppConstant.USDCMETADATAADDRESS)
          .toBase64(),
        initia.bcs.u64().serialize(initToUsdcSimulation).toBase64(), // SWAPPED USDC
      ];
      const usdcToInitSimulation = await lcd.move.viewFunction(
        "0x1",
        "dex",
        "get_swap_simulation",
        [],
        args
      );
      args.push(
        initia.bcs
          .option(initia.bcs.u64())
          .serialize(usdcToInitSimulation)
          .toBase64()
      );

      const usdcToInitiaMsg = new initia.MsgExecute();
      usdcToInitiaMsg.function_name = "swap_script";
      usdcToInitiaMsg.module_address = "0x1";
      usdcToInitiaMsg.module_name = "dex";
      usdcToInitiaMsg.sender = address;
      usdcToInitiaMsg.type_args = [];
      usdcToInitiaMsg.args = args;
      // console.log(usdcToInitiaMsg);

      await signAndBroadcast(usdcToInitiaMsg)
        .then(() => {
          console.log(
            `Successfully Swap ${initToUsdcSimulation / 1000000} USDC To ${
              usdcToInitSimulation / 1000000
            } INIT for Address : ${address}`
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

    await swap(true)
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
        console.log(simulate);

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

        console.log(msg);

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
  lcd,
};
