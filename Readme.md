# INITIA DAILY ROUTING BOT

Initia testnet daily routing bot

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
