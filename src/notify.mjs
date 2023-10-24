import { exec } from "child_process";
import EorzeaTime from "eorzea-time";
import {
  NOTIFICATION_BEFORE_LIST,
  NOTIFICATION_TARGET_LIST,
} from "./common-data.mjs";

const notify = ({ title, body }) => {
  exec(
    `osascript -e 'display notification "${body}" with title "${title}" sound name "Tink"'`
  );
};

const getEorzeaTime = ({ minute, second }) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minute);
  date.setSeconds(date.getSeconds() + second);
  return new EorzeaTime(date);
};

// lhs > rhs or not
const isBefore = (targetData, eorzeaTime) => {
  const lMin = targetData.hour * 60 + targetData.minute;
  const rMin = eorzeaTime.getHours() * 60 + eorzeaTime.getMinutes();
  const offset = 24 * 60;
  const needsOffset = Math.abs(lMin - rMin) > 12 * 60;

  if (needsOffset) {
    if (lMin > rMin) {
      return lMin > rMin + offset;
    } else {
      return lMin + offset > rMin;
    }
  } else {
    return lMin > rMin;
  }
};

export const notifyIfNeed = () => {
  if (
    process.env.DND === "true" ||
    process.env.NOTIFY_TARGET === undefined ||
    process.env.NOTIFY_TARGET.length < 4
  ) {
    return;
  }

  const before = NOTIFICATION_BEFORE_LIST.find(
    (before) => before.label === process.env.NOTIFY_BEFORE
  );

  if (before === undefined) {
    return;
  }

  const eorzeaTimeNow = new EorzeaTime();
  const eorzeaTime1s = getEorzeaTime({
    minute: before.minute,
    second: before.second - 1,
  });
  const eorzeaTimeAfter = getEorzeaTime(before);

  process.env.NOTIFY_TARGET.split(",").forEach((target) => {
    const targetData = NOTIFICATION_TARGET_LIST.find(
      (item) => item.label === target
    );

    if (
      targetData !== undefined &&
      isBefore(targetData, eorzeaTimeNow) &&
      isBefore(targetData, eorzeaTime1s) &&
      !isBefore(targetData, eorzeaTimeAfter)
    ) {
      notify({
        title: "ET Notify",
        body: `ET ${targetData.label} is coming after ${before.label}`,
      });
    }
  });
};
