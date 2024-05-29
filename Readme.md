# INITIA DAILY ROUTING BOT

Initia testnet daily routine bot

## Prerequisite

To run this bot you need to

1. Initia Testnet Account with 30 INIT Balance
2. Node JS Installed

## BOT FEATURE

1. Send 1 Init to Other
2. Send 1 Init to Other (BLACKWING)
3. Send 1 Init to Other (Noon)
4. Send 1 Init to Other (TUCANA)
5. Send 1 Init to Other (INIT AI)
6. Send 1 Init to Other (MINIMOVE)
7. Send 1 Init to Other (MINIWASM)
8. Swap 1 INIT to USDC And Swap back USDC to INIT
9. Stake 0.1 INIT to Omninode

## Set Up

1. Clone the repo
2. cd to project directory
3. run `npm install`
4. run `cp account_tmp.js account.js`
5. modify your account address and private key on `account.js`

```js
const account = [["WALLET ADDRESS", "PRIVATE KEY"]];

export { account };
```

6. run `npm run start`

## NOTE

the bot is sending testnet token to my initia address, you can change it on
`src/utils/constant.js` change the `RECEIVERTESTNETADDRESS` to your address

## CONTRIBUTE

Feel free to fork and contribute adding more feature thanks

## SUPPORT

want to support me for creating another bot ?
buy me a coffee on

EVM : `0x0fd08d2d42ff086bf8c6d057d02d802bf217559a`

SOLANA : `3tE3Hs7P2wuRyVxyMD7JSf8JTAmEekdNsQWqAnayE1CN`
