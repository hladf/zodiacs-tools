import fetch from "node-fetch";
import config from "../config/constants.js";
import { getRequestOptions, isTestMode } from "../helpers/http.js";

export async function getUserData() {
  isTestMode();

  const url = `${config.BASE_URL}/getUserData`;

  const options = getRequestOptions();

  return fetch(url, options).then(async (res) => {
    return res.json();
  });
}
export async function startRace(carId) {
  isTestMode();

  const url = `${config.BASE_URL}/battlefield_startRace`;

  let options = getRequestOptions(carId);

  return fetch(url, options).then(async (res) => {
    return res.json();
  });
}

export async function claimReward(carId) {
  isTestMode();

  const url = `${config.BASE_URL}/battlefield_claimReward`;

  let options = getRequestOptions(carId);

  return fetch(url, options).then((res) => res.json());
}
