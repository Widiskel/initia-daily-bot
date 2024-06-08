import { AppConstant } from "./../utils/constant.js";
import { CHANNEL } from "./enum/channel.js";
import { Pair } from "./enum/pair.js";

function formatDateNowToCustomFormat() {
  const currentDate = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the components of the date
  const year = currentDate.getFullYear();
  const month = monthNames[currentDate.getMonth()];
  const day = currentDate.getDate();
  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedDate = `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds} ${ampm} (UTC)`;
  return formattedDate;
}

function generateTokenInfo(pair, oneWaySwap, address) {
  let liq;
  let firstMetadata;
  let secMetadata;
  if (pair == Pair.INITIATIA) {
    console.log(
      `Swapping 1 INITIA to TIA ${
        !oneWaySwap ? "& TIA to INITIA" : ""
      } for Account ${address}`
    );
    firstMetadata = AppConstant.INITIAMETADATAADDRESS;
    secMetadata = AppConstant.TIAMETADATAADRESS;
    liq = AppConstant.INITIATIALIQUIDITYADDRESS;
  } else if (pair == Pair.INITIAUSDC) {
    console.log(
      `Swapping 1 INITIA to USDC ${
        !oneWaySwap ? "& USDC to INITIA" : ""
      } for Account ${address}`
    );
    firstMetadata = AppConstant.INITIAMETADATAADDRESS;
    secMetadata = AppConstant.USDCMETADATAADDRESS;
    liq = AppConstant.INITIAUSDCLIQUIDITYADDRESS;
  } else if (pair == Pair.INITIAETH) {
    console.log(
      `Swapping 1 INITIA to ETH ${
        !oneWaySwap ? "& ETH to INITIA" : ""
      } for Account ${address}`
    );
    firstMetadata = AppConstant.INITIAMETADATAADDRESS;
    secMetadata = AppConstant.ETHMETADATAADRESS;
    liq = AppConstant.INITIAETHLIQUIDITYADDRESS;
  } else if (pair == Pair.INITIATUC) {
    console.log(
      `Swapping 1 INITIA to TUCANA ${
        !oneWaySwap ? "& TUCANA to INITIA" : ""
      } for Account ${address}`
    );
    firstMetadata = AppConstant.INITIAMETADATAADDRESS;
    secMetadata = AppConstant.TUCMETADATAADRESS;
    liq = AppConstant.INITIATUCANALIQUIDITYADDRESS;
  }
  return [liq, firstMetadata, secMetadata];
}

function getChannel(coin) {
  if (coin == AppConstant.COIN.USDC) {
    return CHANNEL.USDC;
  } else if (coin == AppConstant.COIN.TIA) {
    return CHANNEL.TIA;
  } else if (coin == AppConstant.COIN.TUCANA) {
    return CHANNEL.TUCANA;
  } else if (coin == AppConstant.COIN.ETH) {
    return CHANNEL.ETH;
  }
}

function getTimestamp(coin) {
  if (coin == AppConstant.COIN.USDC) {
    return "1717731635350000000";
  } else if (coin == AppConstant.COIN.TUCANA) {
    return "1717730232981000000";
  } else if (coin == AppConstant.COIN.ETH) {
    return "1717731004768000000";
  }
}

function getMetadataAndPair(coin) {
  if (coin == AppConstant.COIN.USDC) {
    metadata = AppConstant.USDCMETADATAADDRESS;
    pair = Pair.INITIAUSDC;
  } else if (coin == AppConstant.COIN.ETH) {
    metadata = AppConstant.ETHMETADATAADRESS;
    pair = Pair.INITIAETH;
  } else {
    metadata = AppConstant.INITIAMETADATAADDRESS;
  }
}

export {
  formatDateNowToCustomFormat,
  generateTokenInfo,
  getChannel,
  getTimestamp,
  getMetadataAndPair,
};
