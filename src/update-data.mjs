import { exec } from "child_process";
import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";

const PLUGIN_FILE_PATH = fileURLToPath(import.meta.url);
const CONFIG_FILE_PATH = `${PLUGIN_FILE_PATH}.vars.json`;

const saveData = async (data) => {
  const dataString = JSON.stringify(data);
  try {
    await writeFile(CONFIG_FILE_PATH, dataString);
  } catch (e) {
    console.log("error", e);
  }
};

const refreshPlugin = () => {
  exec("open xbar://app.xbarapp.com/refreshAllPlugins");
  // exec(
  //   `open xbar://app.xbarapp.com/refreshPlugin?path=${path.basename(
  //     PLUGIN_FILE_PATH
  //   )}`
  // );
};

export const update = async (key, value) => {
  // default data
  const data = { NOTIFY_TARGET: "", NOTIFY_BEFORE: "1min", DND: false };

  // load data
  if (existsSync(CONFIG_FILE_PATH)) {
    const dataString = await readFile(CONFIG_FILE_PATH);
    const dataJson = JSON.parse(dataString);
    data.NOTIFY_TARGET = dataJson.NOTIFY_TARGET;
    data.NOTIFY_BEFORE = dataJson.NOTIFY_BEFORE;
    data.DND = dataJson.DND;
  }

  if (key === "NOTIFY_TARGET") {
    const targetArray = data.NOTIFY_TARGET.split(",");
    if (targetArray.includes(value)) {
      // remove
      data.NOTIFY_TARGET = targetArray
        .filter((target) => target != value)
        .join(",");
    } else {
      // add
      targetArray.push(value);
      data.NOTIFY_TARGET = targetArray.join(",");
    }
    // save
    await saveData(data);
    // update
    refreshPlugin();
  }

  if (key === "NOTIFY_BEFORE" && data.NOTIFY_BEFORE !== value) {
    data.NOTIFY_BEFORE = value;
    // save
    await saveData(data);
    // update
    refreshPlugin();
  }

  if (key === "DND") {
    data.DND = !data.DND;
    // save
    await saveData(data);
    // update
    refreshPlugin();
  }
};
