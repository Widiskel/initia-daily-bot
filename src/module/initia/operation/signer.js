/**
 * Initia Signer class.
 *
 * Author : Widiskel
 *
 */
class InitiaSigner {
  constructor(wallet, lcd, chainId) {
    this.wallet = wallet;
    this.lcd = lcd;
    this.chainId = chainId;
  }

  async signAndBroadcast(msg) {
    try {
      const signedTx = await this.wallet.createAndSignTx({
        msgs: [msg],
      });
      console.log("TX Signature : ", signedTx.signatures[0]);
      const broadcastResult = await this.lcd.tx.broadcast(signedTx);
      console.log("TX Hash : ", broadcastResult.txhash);
      console.log(
        `Explorer : https://scan.testnet.initia.xyz/${this.chainId}/txs/${broadcastResult.txhash}`
      );
    } catch (error) {
      throw error;
    }
  }
}

export { InitiaSigner };
