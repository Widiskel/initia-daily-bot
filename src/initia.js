import * as initia from "@initia/initia.js";
import * as initiaRepo from "./repository/initia_repo.js";

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
    msg.module_address = "0x9065fda28f52bb14ade545411f02e8e07a9cb4ba";
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
      "init1gadzrjcp3ef90yka3sz2r6tf4wrjdhe2qr0hyp", // recipient address
      "1000000uinit" // 1 Init
    );

    await signAndBroadcast(msg);
  } catch (error) {
    throw error;
  }
}

async function signAndBroadcast(msg) {
  try {
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

export {
  chainId,
  lcd,
  minGasPrice,
  initiation,
  queryBalance,
  claimExp,
  sendToken,
};
