# INITIA DAILY ROUTING BOT

Initia testnet daily routine bot

## Prerequisite

To run this bot you need to

1. Initia Testnet Account with > 30 INIT AND > 5 GAS Balance.
2. Node JS Installed.

## BOT Feature Overview

This BOT automates various tasks for a given wallet address. Below is a detailed breakdown of the features and the sequence of operations it performs.

Bot Feature

1. Send 1 Init to Other
2. Send 1 Init to Other (BLACKWING)
3. Send 1 Init to Other (NOON)
4. Send 1 Init to Other (TUCANA)
5. Send 1 Init to Other (INIT AI)
6. Send 1 Init to Other (MINIMOVE)
7. Send 1 Init to Other (MINIWASM)
8. Send 1 Init to Other (CIVITA)
9. Bridge 1 Init to (CIVITA)
10. Bridge 1 Init to (TUCANA)
11. Bridge 1 Init to (INIT AI)
12. Send 0.1 TIA to Other (NOON) (EXPERIMENTAL)
13. Send 1 USDC to Other (BLACKWING) (EXPERIMENTAL)
14. Send 5 TUC to Other (TUCANA) (EXPERIMENTAL)
15. Send 0.0001 ETH to Other (MINIMOVE) (EXPERIMENTAL)
16. Swap 1 INIT to USDC
17. Swap 1 INIT to TIA
18. Swap 1 INIT to TUC
19. Swap 1 INIT to ETH
20. Stake 0.1 INIT to Omninode Account
21. Stake 0.5 USDC / INITIA LP to Omninode Account
22. Stake 0.01 TIA / INITIA LP to Omninode Account
23. Stake 0.0001 ETH / INITIA LP to Omninode Account
24. Request Faucet for Tucana Account
25. Add 1 TUC to Tucana Liquidity PERP
26. Swap 1 INIT to USDC on TUCANA Account
27. Roll Civitia Dice 3x For Account
28. Claim Staking Reward on Omninode
29. Vote a proposal on Initia
30. Move Initia Stakes from Omninode to Nodes.Guru
31. Add Liquidity INIT/USDC on Tucana Liquidity Pool

## Set Up

1. Clone the repo or Download the latest release [Here](https://github.com/Widiskel/initia-daily-bot/releases)
2. cd to project directory
3. run `npm install`
4. run `cp account_tmp.js account.js`
5. modify your account address and private key on `account.js`

```js
const account = [["WALLET ADDRESS", "PRIVATE KEY"]];

export { account };
```

6. run `cp config_tmp.js config.js`

## Configure Bot

Bot now have so many feature, but your daily faucet is only 30 INITIA. Thats why now im provide the way to configure what feature you want to use. To choose what feature you want to use

1. Open `config.js`.
2. look at

```js
// MORE TX CONFIG
// this.config = Array.from({ length: 29 }, (_, i) => i + 1);

// FOCUS EXP CONFIG
// this.config = [1, 9, 10, 11, 6, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

// USER CONFIG
this.config = [1];
```

3. Modify the USER CONFIG, based on the bot feature number that you want to run.

## Running Bot

- To do 1 time run execute `npm run start`
- To do scheduler run execute `npm run schedule` (EXPERIMENTAL)

## Note

This bot send token to my testnet address account, to change the address with yours, check the `src/utils/constant.js` and change the `RECEIVERWALLETADDRESS` with your address.

## UPDATE

to update the bot,

- if you clone the repo you can simply run `git pull` or `git pull --rebase`.
- if you download from the release, just download new latest release.

## CONTRIBUTE

Feel free to fork and contribute adding more feature thanks.

## SUPPORT

want to support me for creating another bot ?
buy me a coffee on

EVM : `0x0fd08d2d42ff086bf8c6d057d02d802bf217559a`

SOLANA : `3tE3Hs7P2wuRyVxyMD7JSf8JTAmEekdNsQWqAnayE1CN`
