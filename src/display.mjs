import xbar, { isXbar, separator } from "@sindresorhus/xbar";
import EorzeaTime from "eorzea-time";
import {
  NOTIFICATION_BEFORE_LIST,
  NOTIFICATION_TARGET_LIST,
} from "./common-data.mjs";

const ICON_CHECK_MARK = "􀆅";
const ICON_BELL = "􀋙";
const ICON_BELL_SLASH = "􀋝";

const isDND = () => {
  return process.env.DND === "true";
};

export const display = () => {
  const eorzeaTime = new EorzeaTime();

  const notificationTargetMenu = NOTIFICATION_TARGET_LIST.map(
    (target, index) => {
      const params = {
        text: `ET ${target.label}`,
        shell: process.argv[1],
        param1: "NOTIFY_TARGET",
        param2: target.label,
        terminal: false,
        font: "Monaco",
      };

      // xbar doesn't support checked property
      if (
        process.env.NOTIFY_TARGET !== undefined &&
        process.env.NOTIFY_TARGET.includes(target.label)
      ) {
        if (isXbar) {
          params.text += ` ${ICON_CHECK_MARK}`;
        } else {
          params.checked = true;
        }
      }

      return params;
    }
  );

  const notificationBeforeMenu = NOTIFICATION_BEFORE_LIST.map((before) => {
    const params = {
      text: before.label.padStart(5, "0"),
      shell: process.argv[1],
      param1: "NOTIFY_BEFORE",
      param2: before.label,
      terminal: false,
      font: "Monaco",
    };

    // xbar doesn't support checked property
    if (before.label === process.env.NOTIFY_BEFORE) {
      if (isXbar) {
        params.text += ` ${ICON_CHECK_MARK}`;
      } else {
        params.checked = true;
      }
    }

    return params;
  });

  xbar([
    {
      text: `${
        isDND() ? ICON_BELL_SLASH : ICON_BELL
      } ET ${eorzeaTime.toString()}`,
      font: "Monaco",
    },
    separator,
    {
      text: "Notify Target",
      submenu: notificationTargetMenu,
    },
    {
      text: "Notify Before",
      submenu: notificationBeforeMenu,
    },
    {
      text: `${isDND() ? ICON_BELL_SLASH : ICON_BELL} Do not disturb: ${
        isDND() ? "ON" : "OFF"
      }`,
      shell: process.argv[1],
      param1: "DND",
      terminal: false,
    },
    // for debug
    // separator,
    // { text: `${process.env.NOTIFY_BEFORE}` },
    // { text: `${process.env.NOTIFY_TARGET}` },
    // { text: `${process.env.DND}` },
  ]);
};
