async function getTucanaFaucet(address) {
  try {
    const response = await fetch("https://birdee-faucet.testnet.mesoops.net/", {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        "content-type": "application/json",
        Referer: "https://birdee.faucet.tucana.zone/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify({
        address: address,
        coins: ["10000000utuc"],
      }),
      method: "POST",
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Successfully request Faucet on TUCANA");
      console.log();
    } else {
      console.error(
        `Error during request tucana faucet: ${response.statusText} - ${data.error}`
      );
    }
  } catch (error) {
    console.error("Error during request tucana faucet:", error);
  }
}
export { getTucanaFaucet };
