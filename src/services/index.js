import fetch from "node-fetch";
import config from "../config/constants.js";
import { getRequestOptions, isTestMode } from "../helpers/http.js";

export async function getUserData() {
  isTestMode();

  const url = `${config.BASE_URL}/user_getData`;

  const options = getRequestOptions();

  return fetch(url, options)
    .then(async (res) => {
      console.log("\n\n res 👉", { res }, "\n");

      return { status: res.status, data: await res.json() };
    })
    .catch((error) => console.log({ error }));
}
export async function startRace(carId) {
  isTestMode();

  const url = `${config.BASE_URL}/battlefield_startRace`;

  let options = getRequestOptions(carId);

  return fetch(url, options)
    .then(async (res) => {
      return { data: await res.json(), status: res.status };
    })
    .catch((error) => console.log({ error }));
}

export async function claimReward(carId) {
  isTestMode();

  const url = `${config.BASE_URL}/battlefield_claimReward`;

  let options = getRequestOptions(carId);

  return fetch(url, options)
    .then(async (res) => {
      return { data: await res.json(), status: res.status };
    })
    .catch((error) => console.log({ error }));
}
