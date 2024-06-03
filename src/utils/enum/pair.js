const Pair = {
  INITIAUSDC: "initia/usdc",
  INITIATIA: "initia/tia",

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
