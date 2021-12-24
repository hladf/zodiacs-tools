import configs from '../config/constants.js';
import { startRace, getUserData, claimReward } from '../services/index.js';
import { registerLog } from './fileSystem.js';

export async function waitSeconds(seconds) {
  return await new Promise((resolve) =>
    setTimeout(() => resolve(), seconds * 1000)
  );
}

export async function runRaceAutomation() {
  console.log('Iniciando RaceAutomation...'.blue.bold);
  const userDataResponse = await getUserData();
  // console.log({ userDataResponse });
  if (!userDataResponse?.result) {
    return console.log('Nao foi encontrado dados sobre sua conta'.red.bold);
  }
  const message = `Saldo da conta atual: ${userDataResponse.result.userWallet.balance}`;
  registerLog({ message, title: 'Race Automation' });
  console.log(message.red.bold);

  const carList = configs.CARS_IDS.split(',');
  console.log('\n\n Carros encontrados: ', carList, '\n');

  for (const carId of carList) {
    try {
      const message = `Iniciando corrida com o carro "${carId}", com duração de ${configs.RACE_DURATION} segundos.`;
      registerLog({ message, title: 'Race Automation' });
      console.log(message.red.bold);

      const raceData = await startRace(carId);
      // console.log('\n\n ', { raceData }, '\n');
      // const racesCount = Number(raceData?.result?.racingCount || 99);
      if (raceData?.code === 141) {
        const message = `O carro "${carId}" atingiu o numero maximo de corridas (12).`;
        registerLog({ message, title: 'Race Automation' });
        console.log(message.red.bold);
        await waitSeconds(5);
        continue;
      }

      const msgRacingCount = `Corrida numero ${
        raceData?.result?.racingCount || X
      } do carro "${carId}".`;
      // registerLog({ message, title: 'Race Automation' });
      console.log(msgRacingCount.blue);
      await waitSeconds(Number(configs.RACE_DURATION));

      const msgClaim = `Iniciando reivindicação de recompensas`;
      registerLog({ message: msgClaim, title: 'Race Automation' });
      console.log(msgClaim.green.bold);
      const rewardData = await claimReward(carId);
      // console.log('\n\n ', { rewardData }, '\n');

      const msgClaimSuccess = `Recompensas: \n${JSON.stringify(
        rewardData.result.result,
        undefined,
        2
      )}`;
      registerLog({
        message: msgClaimSuccess.replace(/\n/g, ''),
        title: 'Race Automation',
      });
      console.log(msgClaimSuccess.green.bold);

      await waitSeconds(3);
    } catch (error) {
      const messageError = `Houve um erro ao executar uma acao para o carro ${carId}. Erro: ${
        error.message || error
      }`;
      // registerLog({ message: messageError, title: 'Race Automation' });
      console.log(messageError.black.bgRed.bold);
    }
  }
}
