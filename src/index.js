import configs from './config/constants.js';
import { runRaceAutomation } from './helpers/index.js';
// eslint-disable-next-line
import colors from 'colors';
import fetch from 'node-fetch';

function runInLoop() {
  let loopId = 0;
  const time = 0.3 * 60 * 1000;
  try {
    const today = new Date().toLocaleString();
    console.log(`Agora é: ${today}`.black.bgGreen);
    // console.log('Configurações:'.blue.bold);
    // console.log(
    //   `{ LOOP_TIME: ${LOOP_TIME} minutos, INTERVAL_BETWEEN_ACTIONS: ${INTERVAL_BETWEEN_ACTIONS} segundos }`
    //     .blue.bold
    // );
    runRaceAutomation();
    loopId = setInterval(() => {
      console.log('.'.black);
      const today = new Date().toLocaleTimeString(); // returns today's date in mm/dd/yyyy format
      console.log(`>>> ${today} `.black.bgGreen);
      runRaceAutomation();
    }, time);
  } catch (error) {
    clearInterval(loopId);
    console.error({ error });
  }
}

// console.log(process.argv);
if (process.argv.includes('--report')) {
  runPlantsProfitReport();
} else {
  runInLoop();
}
