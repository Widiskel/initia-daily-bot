export const COIN = {
  GAS: "move/944f8dd8dc49f96c25fea9849f16436dcfa6d564eec802f3ef7f8b3ea85368ff",
  ETHINITLP:
    "move/a2b0d3c8e53e379ede31f3a361ff02716d50ec53c6b65b8c48a81d5b06548200",
  TIAINITLP:
    "move/b134ae6786f10ef74294e627d2519b63b7c742a6735f98682929fea9a84744d2",
  USDCINITLP:
    "move/dbf06c48af3984ec6d9ae8a9aa7dbb0bb1e784aa9b8c4a5681af660cf8558d7d",
  INIT: "uinit",
  USDC: "uusdc",
  ETH: "ueth",
  TIA: "utia",
  TUCANA:
    "ibc/276C63284D960E3E4D76AEFC9A8BA338BAD24E30530C7C95E7EFC4D250D4E23D",
  UNKNOWN: "UNKNOWN",

  getCoinByValue: function (value) {
    for (const key in this) {
      if (this.hasOwnProperty(key) && this[key] === value) {
        return key;
      } else {
        return this.UNKNOWN;
      }
    }
    return this.UNKNOWN;
  },
};
