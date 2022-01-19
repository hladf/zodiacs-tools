// export async function waitSeconds(seconds) {
//   return await new Promise((resolve) =>
//     setTimeout(() => resolve(), seconds * 1000)
//   );
// }

function tryClaim() {
  const claimBtn = document.querySelector(
    "body > div:nth-child(8) > div > div.ant-modal-wrap.ant-modal-confirm-centered.ant-modal-centered > div > div.ant-modal-content > div > div > div.ant-modal-confirm-btns > button"
  );
  if (String(claimBtn?.innerText).toUpperCase().includes("CLAIM")) {
    console.log("encontrado botao de CLAIM");
    claimBtn?.click && claimBtn.click();
  }
}

function tryStartRace() {
  const startRaceBtn = document.querySelector(
    "#root > section > section > div > div > div > div > div.selected.content.mb-1.text-center.p-3.shadowed > div > div.mt-3 > div"
  );
  if (String(startRaceBtn?.innerText).toUpperCase().includes("START RACE")) {
    console.log("encontrado botao de START RACE");
    startRaceBtn?.click && startRaceBtn.click();
  }
}

function tryCheckRes() {
  const checkResultBtn = document.querySelector(
    "#root > section > section > div > div > div > div > div > div > div.mt-3 > div"
  );
  if (
    String(checkResultBtn?.innerText).toUpperCase().includes("CHECK RESULT")
  ) {
    console.log("encontrado botao de CHECK RESULT");
    checkResultBtn?.click && checkResultBtn.click();
  }
}

function runCarSelection(callback) {
  console.log("tentando selecionar primeiro carro...");
  const carList = document.querySelector(
    `#root > section > section > div > div > div > div > div:nth-child(2) > div.ant-card.ant-card-bordered.car-list.border-0 > div`
  ).childElementCount;

  for (let carIndex = 0; carIndex < carList; carIndex++) {
    const selectCar = (index) =>
      document.querySelector(
        `#root > section > section > div > div > div > div > div:nth-child(2) > div.ant-card.ant-card-bordered.car-list.border-0 > div > div:nth-child(${
          index + 1
        })`
      );
    selectCar(carIndex)?.click();

    const carRacingCount = document.querySelector(
      "#root > section > section > div > div > div > div > div.selected.content.mb-1.text-center.p-3.shadowed > div > div:nth-child(5)"
    ).innerText;
    const carExpired = document
      .querySelector(
        "#root > section > section > div > div > div > div > div.selected.content.mb-1.text-center.p-3.shadowed > div > div.text-center.text-red > div"
      )
      ?.innerText?.includes("Expired");

    console.log(`racing count do carro ${carIndex + 1} -> ${carRacingCount}`);
    if (
      !carExpired &&
      String(carRacingCount).includes("/10") &&
      !String(carRacingCount).includes("10/10")
    ) {
      console.log("\n ✅ Clicando no carro ", carIndex + 1, "\n");
      break;
    } else {
      selectCar(carIndex + 1)?.click();
      console.log(
        "\n ✅ corridas feitas ou não foi encontrado a contagem de corridas.",
        "\n"
      );
    }
  }
  callback && callback();

  // const claimBtn = document.querySelector(
  //   "body > div:nth-child(8) > div > div.ant-modal-wrap.ant-modal-confirm-centered.ant-modal-centered > div > div.ant-modal-content > div > div > div.ant-modal-confirm-btns > button"
  // );
}

function runAll(duration = 60, interval = 5) {
  const intervalId = setInterval(() => {
    console.log("buscando botoes...");
    tryCheckRes();
    tryClaim();
    runCarSelection(tryStartRace);
    // tryStartRace();
  }, interval * 1000);

  setTimeout(() => {
    clearInterval(intervalId);
    console.log("encerrando loop...");
  }, duration * 1000);
}
runAll(120);
