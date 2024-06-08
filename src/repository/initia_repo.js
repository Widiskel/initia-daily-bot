async function getInitiation() {
  try {
    const response = await fetch(
      "https://omni-api.initiation-1.initia.xyz/v1/registry/chains/initiation-1",
      {
        headers: {
          accept: "application/json, text/plain, */*",
        },
        referrer: "https://app.testnet.initia.xyz/",
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "GET",
        mode: "cors",
        credentials: "omit",
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error during initiation:", response.statusText);
      throw new Error(
        "Failed to fetch initiation data. Status: " + response.statusText
      );
    }
  } catch (error) {
    throw error;
  }
}

async function getStageInfo() {
  const response = await fetch(
    "https://b545809c-5562-4e60-b5a1-22e83df57748.initiation-1.mesa-rest.ue1-prod.newmetric.xyz/initia/move/v1/accounts/0x9065fda28f52bb14ade545411f02e8e07a9cb4ba/modules/jennie/view_functions/stage_info",
    {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      referrer: "https://app.testnet.initia.xyz/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: '{"type_args":[],"args":[]}',
      method: "POST",
      mode: "cors",
      credentials: "omit",
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      "Failed to fetch stage info data. Status: " + response.statusText
    );
  }
}
async function getReferalPoint() {
  const response = await fetch(
    "https://xp-api.initiation-1.initia.xyz/leaderboard/rankings/init1gadzrjcp3ef90yka3sz2r6tf4wrjdhe2qr0hyp",
    {
      headers: {
        accept: "application/json, text/plain, */*",
      },
      referrer: "https://app.testnet.initia.xyz/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      "Failed to fetch stage info data. Status: " + response.statusText
    );
  }
}

async function getLatestProposal() {
  try {
    const response = await fetch(
      "https://api.initiation-1.initia.xyz/indexer/gov/v1/proposals?status=all",
      {
        headers: {
          accept: "application/json, text/plain, */*",
        },
        referrer: "https://app.testnet.initia.xyz/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.proposals[0];
    } else {
      throw new Error(
        "Failed to fetch proposals data. Status: " + response.statusText
      );
    }
  } catch (error) {
    throw error;
  }
}

export { getInitiation, getStageInfo, getReferalPoint, getLatestProposal };
