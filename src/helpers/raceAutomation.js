import configs from "../config/constants.js";
import { startRace, getUserData, claimReward } from "../services/index.js";
import { registerLog } from "./fileSystem.js";
import { requestRetry, waitSeconds } from "./requestRetry.js";

export async function runRaceAutomation() {
  console.log("Iniciando RaceAutomation...".blue.bold);
  // const userDataResponse = await requestRetry(getUserData, 5);
  const userDataResponse = await getUserData();

  console.log({ userDataResponse });
  // return
  if (!userDataResponse?.data?.result) {
    console.log("Nao foi encontrado dados sobre sua conta".red.bold);
  }
  const message = `Saldo da conta atual: ${userDataResponse.data?.result?.userWallet?.balance}`;
  registerLog({ message, title: "Race Automation" });
  console.log(message.red.bold);

  const carList = configs.CARS_IDS.split(",");
  console.log("\n\n Carros encontrados: ", carList, "\n");

  for (const carId of carList) {
    try {
      const message = `Iniciando corrida com o carro "${carId}", com duração de ${configs.RACE_DURATION} segundos.`;
      registerLog({ message, title: "Race Automation" });
      console.log(message.red.bold);

      // const raceData = await requestRetry(() => startRace(carId), 5).data;
      const raceData = await startRace(carId);
      console.log('\n\n ', { raceData }, '\n');
      // const racesCount = Number(raceData?.result?.racingCount || 99);
      if (raceData?.data?.code === 141) {
        console.log(
          "\n\n raceData response ->",
          JSON.stringify(raceData, undefined, 1),
          "\n"
        );
        if (raceData.error?.includes("already a car on racing")) {
          const message = `O carro "${carId}" ainda está em uma corrida. Aguardando mais 7 segundos...`;
          registerLog({ message, title: "Race Automation" });
          console.log(message.red.bold);
          await waitSeconds(7);
          const msgClaim = `Iniciando reivindicação de recompensas`;
          registerLog({ message: msgClaim, title: "Race Automation" });
          console.log(msgClaim.green.bold);
          // const rewardData = await requestRetry(() => claimReward(carId)).data;
          const rewardData = await claimReward(carId);
          // console.log('\n\n ', { rewardData }, '\n');

          const msgClaimSuccess = `Recompensas: \n${JSON.stringify(
            rewardData.data?.result.result,
            undefined,
            2
          )}`;
          registerLog({
            message: msgClaimSuccess.replace(/\n/g, ""),
            title: "Race Automation",
          });
          console.log(msgClaimSuccess.green.bold);
          continue;
        }

        const message = `O carro "${carId}" atingiu o numero maximo de corridas (12).`;
        registerLog({ message, title: "Race Automation" });
        console.log(message.red.bold);

        await waitSeconds(7);
        continue;
      }

      const msgRacingCount = `Corrida numero ${
        raceData?.data?.result?.racingCount || 0
      } do carro "${carId}".`;
      // registerLog({ message, title: 'Race Automation' });
      console.log(msgRacingCount.blue);
      await waitSeconds(Number(configs.RACE_DURATION));

      const msgClaim = `Iniciando reivindicação de recompensas`;
      registerLog({ message: msgClaim, title: "Race Automation" });
      console.log(msgClaim.green.bold);
      // const rewardData = await requestRetry(() => claimReward(carId)).data;
      const rewardData = await claimReward(carId).data;
      // console.log('\n\n ', { rewardData }, '\n');
      console.log({rewardData: rewardData?.data?.result, json: JSON.stringify(rewardData, undefined, 1)});

      const msgClaimSuccess = `Recompensas: \n${JSON.stringify(
        rewardData?.result,
        undefined,
        2
      )}`;
      registerLog({
        message: msgClaimSuccess.replace(/\n/g, ""),
        title: "Race Automation",
      });
      console.log(msgClaimSuccess.green.bold);

      await waitSeconds(4);
    } catch (error) {
      const messageError = `Houve um erro ao executar uma acao para o carro ${carId}. Erro: ${
        error.message || error
      }`;
      // registerLog({ message: messageError, title: 'Race Automation' });
      console.log(messageError.black.bgRed.bold);
    }
  }
}
