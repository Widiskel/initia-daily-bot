# INITIA DAILY ROUTING BOT

Initia testnet daily routine bot

## Prerequisite

To run this bot you need to

1. Initia Testnet Account with > 30 INIT AND > 5 GAS Balance
2. Node JS Installed

## BOT FEATURE

1. Send 1 Init to Other
2. Send 1 Init to Other (BLACKWING)
3. Send 1 Init to Other (Noon)
4. Send 1 Init to Other (TUCANA)
5. Send 1 Init to Other (INIT AI)
6. Send 1 Init to Other (MINIMOVE)
7. Send 1 Init to Other (MINIWASM)
8. Send 1 Init to Other (CIVITA)
9. Send 1 Init to Other (MINIWASM)
10. Send 0.1 TIA to Other (NOON) (EXPERIMENTAL)
11. Send 1 USDC to Other (BLACKWING) (EXPERIMENTAL)
12. Send 5 TUC to Other (TUCANA) (EXPERIMENTAL)
13. Send 0.0001 ETH to Other (TUCANA) (EXPERIMENTAL)
14. Swap 1 INIT to USDC
15. Swap 1 INIT to TIA
16. Stake 0.1 INIT to Omninode
17. Stake 0.5 USDC / INITIA LP to Omninode
18. Stake 0.01 TIA / INITIA LP to Omninode
19. Stake 0.0001 ETH / INITIA LP to Omninode
20. Swap 1 INIT to USDC on TUCANA

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

## Running Bot

- To do 1 time run execute `npm run start`
- To do scheduler run execute `npm run schedule` (EXPERIMENTAL)

## CONTRIBUTE

Feel free to fork and contribute adding more feature thanks

## SUPPORT

want to support me for creating another bot ?
buy me a coffee on

EVM : `0x0fd08d2d42ff086bf8c6d057d02d802bf217559a`

SOLANA : `3tE3Hs7P2wuRyVxyMD7JSf8JTAmEekdNsQWqAnayE1CN`
