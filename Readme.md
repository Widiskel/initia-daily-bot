# INITIA DAILY ROUTING BOT

Initia testnet daily routing bot

## Prerequisite

To run this bot you need to

1. Initia Testnet Account with 30 INIT Balance
2. Node JS Installed

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
