import * as initia from "@initia/initia.js";
import * as initiaRepo from "./repository/initia_repo.js";
import { AppConstant } from "./utils/constant.js";

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
      gasPrices: minGasPrice + "uinit",
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
        `${balances[0]._coins[coin].amount / 1000000} ${
          balances[0]._coins[coin].denom
        }`
      );
    });
    console.log();
    return balances[0]._coins.uinit;
  } catch (error) {
    console.error("Error during checking balance:", error);
    throw error;
  }
}

async function claimExp() {
  try {
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
    console.log();
    const msg = new initia.MsgSend(
      address, // sender address
      AppConstant.WIDISKELTESTNETADDRESS, // recipient address
      "1000000uinit" // 1 Init
    );

    await signAndBroadcast(msg);
  } catch (error) {
    throw error;
  }
}

async function swap() {
  try {
    // Args INITIA > USDC
    var args = [
      initia.bcs
        .address()
        .serialize(AppConstant.INITIALIQUIDITYADDRESS)
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
    await signAndBroadcast(initiaToUsdcMsg);
    console.log(
      `Successfully Swap 1 Init To ${initToUsdcSimulation / 1000000} USDC`
    );

    // Args USDC > INIT
    args = [
      initia.bcs
        .address()
        .serialize(AppConstant.INITIALIQUIDITYADDRESS)
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

    await signAndBroadcast(usdcToInitiaMsg);
    console.log(
      `Successfully Swap ${initToUsdcSimulation / 1000000} To ${
        usdcToInitSimulation / 1000000
      } INIT`
    );
  } catch (error) {
    throw error;
  }
}

async function signAndBroadcast(msg) {
  try {
    console.log(msg);
    const signedTx = await wallet.createAndSignTx({
      msgs: [msg],
    });
    console.log(signedTx);
    console.log();
    const broadcastResult = await lcd.tx.broadcast(signedTx);
    console.log(broadcastResult);
    console.log();
  } catch (error) {
    throw error;
  }
}

export { initiation, queryBalance, claimExp, sendToken, swap };
