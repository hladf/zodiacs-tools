export async function waitSeconds(seconds) {
  return await new Promise((resolve) =>
    setTimeout(() => resolve(), seconds * 1000)
  );
}

export async function requestRetry(requestParam, retryTimes = 1) {
  if (typeof requestParam !== "function") {
    return;
  }

  try {
    let success = false;
    let responseData;
    // for (let index = 1; index <= retryTimes; index++) {
    const requestsToTry = new Array(retryTimes).fill(requestParam);
    for await (const [_, request] of requestsToTry.entries()) {
      const response = await requestParam();

      console.log("requestRetry >>>", {
        request,
        requestsToTry,
        response: response?.data,
        status: response.status,
      });
      success = response && response.status < 500;
      if (success) {
        responseData = response.data;
        break;
      }
      console.log("tentou wait");
      await waitSeconds(3);
    }

    return responseData;
  } catch (error) {
    console.log("requestRetry error >>>", { error });
  }
}
