export const BridgeID = {
  MINIMOVE: 1,
  MINIWASM: 2,
  INITAI: 6,
  BLACKWING: 8,
  TUCANA: 14,
  NOON: 17,
  CIVITA: 24,

  getBridgeByValue: function (value) {
    for (const key in this) {
      if (this.hasOwnProperty(key) && this[key] === value) {
        return key;
      }
    }
    throw new Error("No such Bridge Id with value: " + value);
  },
};
