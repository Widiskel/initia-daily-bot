const Pair = {
  INITIAUSDC: "INITIA/USDC",
  INITIATIA: "INITIA/TIA",
  INITIAETH: "INITIA/ETH",
  INITIATUC: "INITIA/TUCANA",

  getKey: function (value) {
    for (const key in this) {
      if (this.hasOwnProperty(key) && this[key] === value) {
        return key;
      }
    }
    throw new Error("No such pair with value: " + value);
  },
};

export { Pair };
