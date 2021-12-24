import config from "../config/constants.js";

export function isTestMode() {
  if (config.TEST_MODE) {
    console.log(`getUserData()`.bgWhite.black);
    return;
  }
}

export function getRequestOptions(userCarId) {
  const options = {
    method: "POST",
    headers: {
      authority: "8za04rmw3eb0.grandmoralis.com:2053",
      pragma: "no-cache",
      "cache-control": "no-cache",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
      dnt: "1",
      "sec-ch-ua-mobile": "?0",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
      "sec-ch-ua-platform": '"Windows"',
      "content-type": "application/json",
      accept: "*/*",
      origin: "https://app.zodiacs.me",
      "sec-fetch-site": "cross-site",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      referer: "https://app.zodiacs.me/",
      "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    },
    body: JSON.stringify({
      _ClientVersion: "js0.0.46",
      _ApplicationId: config.APPLICATION_ID,
      _InstallationId: config.INSTALLATION_ID,
      _SessionToken: config.SESSION_TOKEN,
    }),
  };

  if (userCarId) {
    options.body = JSON.stringify({
      userCarId,
      _ClientVersion: "js0.0.46",
      _ApplicationId: config.APPLICATION_ID,
      _InstallationId: config.INSTALLATION_ID,
      _SessionToken: config.SESSION_TOKEN,
    });
  }

  return options;
}
