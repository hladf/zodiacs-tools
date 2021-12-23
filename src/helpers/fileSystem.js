import fs from 'fs';

const tempLog = [];

/** Data must be a JSON */
export function writeDataToFile(data, path) {
  if (!data || !path) {
    return;
  }
  let json = JSON.stringify(data, undefined, 2);
  fs.writeFileSync(path, json);
}

export function appendDataToFile(data, path) {
  if (!data || !path) {
    return;
  }
  fs.appendFileSync(path, data);
}

export function readFileData(path) {
  if (!path) {
    return;
  }
  return fs.readFileSync(path).toString();
}

export function registerLog({ message, title }) {
  const timestamp = new Date().toLocaleString().substring(0, 16);
  const date = timestamp.substring(0, 10).replace(/\//g, '-');
  const logText = `${timestamp} => ${title} ### ${message};\n`;
  if (
    message.includes('Nao ha acoes para serem feitas') &&
    tempLog.reverse()?.[0]?.includes(message)
  ) {
    return;
  }
  tempLog.push(logText);
  appendDataToFile(logText, `./src/logs/${date}.log`);
}
