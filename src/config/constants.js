import dotenv from 'dotenv';
dotenv.config();

const TOKEN = process.env.TOKEN;
const CARS_IDS = process.env.CARS_IDS;
const APPLICATION_ID = process.env.APPLICATION_ID;
const INSTALLATION_ID = process.env.INSTALLATION_ID;
const SESSION_TOKEN = process.env.SESSION_TOKEN;
const RACE_DURATION = process.env.RACE_DURATION;
const TEST_MODE = false;

export default {
  TOKEN,
  CARS_IDS,
  APPLICATION_ID,
  INSTALLATION_ID,
  SESSION_TOKEN,
  RACE_DURATION,
  TEST_MODE,
};
