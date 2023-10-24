#!/usr/bin/env node
// <bitbar.title>Eorzea Time</bitbar.title>
// <bitbar.version>v1.0.0</bitbar.version>
// <bitbar.author>Takeshi Yaeda</bitbar.author>
// <bitbar.author.github>yaeda</bitbar.author.github>
// <bitbar.desc>Show Final Fantasy XIV in game clock (Eorzea Time / ET)</bitbar.desc>
// <bitbar.image></bitbar.image>
// <bitbar.dependencies>node,fs-symbols</bitbar.dependencies>
// <bitbar.abouturl></bitbar.abouturl>
// <bitbar.droptypes></bitbar.droptypes>
// <swiftbar.hideAbout>true</swiftbar.hideAbout>
// <swiftbar.hideRunInTerminal>true</swiftbar.hideRunInTerminal>
// <swiftbar.hideLastUpdated>true</swiftbar.hideLastUpdated>
// <swiftbar.hideDisablePlugin>true</swiftbar.hideDisablePlugin>
// <swiftbar.hideSwiftBar>true</swiftbar.hideSwiftBar>
// <xbar.var>string(NOTIFY_TARGET=""): notification target time</xbar.var>
// <xbar.var>select(NOTIFY_BEFORE=1min): notification lead time [30s, 1min, 3min, 10min, 30min]</xbar.var>
// <xbar.var>boolean(DND=false): do not disturb</xbar.var>
// <swiftbar.environment>["NOTIFY_TARGET":"", NOTIFY_BEFORE:1min, DND:false]</swiftbar.environment>
import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ({

/***/ 112:
/***/ ((module) => {

var t=0;function e(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var n="__private_"+t+++"_date";module.exports=function(){function t(t){void 0===t&&(t=new Date),Object.defineProperty(this,n,{writable:!0,value:void 0}),e(this,n)[n]=function(t){var e=new Date,n=Math.floor(t.getTime()*(1440/70));return e.setTime(n),e}(t)}var r=t.prototype;return r.getHours=function(){return e(this,n)[n].getUTCHours()},r.getMinutes=function(){return e(this,n)[n].getUTCMinutes()},r.getSeconds=function(){return e(this,n)[n].getUTCSeconds()},r.toString=function(){return[("0"+this.getHours()).slice(-2),("0"+this.getMinutes()).slice(-2),("0"+this.getSeconds()).slice(-2)].join(":")},r.toJSON=function(){return this.toString()},t}();
//# sourceMappingURL=eorzea-time.js.map


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

;// CONCATENATED MODULE: external "process"
const external_process_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("process");
;// CONCATENATED MODULE: external "node:process"
const external_node_process_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:process");
;// CONCATENATED MODULE: ./node_modules/@sindresorhus/xbar/index.js


const separator = Symbol('separator');

const isDarkMode = external_node_process_namespaceObject.env.XBARDarkMode === 'true';

const isXbar = external_node_process_namespaceObject.env.__CFBundleIdentifier === 'com.xbarapp.app';

const encodeHref = url => {
	url = encodeURI(url);
	url = url.replace(/'/g, '%27');
	url = url.replace(/&/g, '%26');
	return url;
};

const _create = (input, options = {}, menuLevel = 0) => {
	if (typeof options.text !== 'undefined') {
		throw new TypeError('The `text` option is not supported as a top-level option. Use it on an item instead.');
	}

	return input.map(line => {
		if (typeof line === 'string') {
			line = {text: line};
		}

		if (line === separator) {
			return '--'.repeat(menuLevel) + '---';
		}

		line = {
			...options,
			...line,
		};

		const {text} = line;
		if (typeof text !== 'string') {
			throw new TypeError('The `text` property is required and should be a string');
		}

		delete line.text;

		let submenuText = '';
		if (typeof line.submenu === 'object' && line.submenu.length > 0) {
			submenuText = `\n${_create(line.submenu, options, menuLevel + 1)}`;
			delete line.submenu;
		}

		const prefix = '--'.repeat(menuLevel);

		return text.split('\n').map(textLine => {
			const options = Object.entries(line).map(([key, value]) => {
				const finalValue = key === 'href' ? encodeHref(value) : value;
				return `${key}="${finalValue}"`;
			}).join(' ');

			return `${prefix}${textLine}|${options}`;
		}).join('\n') + submenuText;
	}).join('\n');
};

function xbar(input, options) {
	console.log(_create(input, options));
}

// EXTERNAL MODULE: ./node_modules/eorzea-time/dist/eorzea-time.js
var eorzea_time = __nccwpck_require__(112);
;// CONCATENATED MODULE: ./src/common-data.mjs
const NOTIFICATION_TARGET_LIST = [
  { label: "00:00", hour: 0, minute: 0 },
  { label: "02:00", hour: 2, minute: 0 },
  { label: "04:00", hour: 4, minute: 0 },
  { label: "06:00", hour: 6, minute: 0 },
  { label: "08:00", hour: 8, minute: 0 },
  { label: "10:00", hour: 10, minute: 0 },
  { label: "12:00", hour: 12, minute: 0 },
  { label: "14:00", hour: 14, minute: 0 },
  { label: "16:00", hour: 16, minute: 0 },
  { label: "18:00", hour: 18, minute: 0 },
  { label: "20:00", hour: 20, minute: 0 },
  { label: "22:00", hour: 22, minute: 0 },
];

const NOTIFICATION_BEFORE_LIST = [
  { label: "30sec", minute: 0, second: 30 },
  { label: "1min", minute: 1, second: 0 },
  { label: "3min", minute: 3, second: 0 },
  { label: "10min", minute: 10, second: 0 },
  { label: "30min", minute: 30, second: 0 },
];

;// CONCATENATED MODULE: ./src/display.mjs




const ICON_CHECK_MARK = "􀆅";
const ICON_BELL = "􀋙";
const ICON_BELL_SLASH = "􀋝";

const isDND = () => {
  return process.env.DND === "true";
};

const display = () => {
  const eorzeaTime = new eorzea_time();

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
      color: "white",
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

;// CONCATENATED MODULE: external "child_process"
const external_child_process_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("child_process");
;// CONCATENATED MODULE: ./src/notify.mjs




const notify = ({ title, body }) => {
  (0,external_child_process_namespaceObject.exec)(
    `osascript -e 'display notification "${body}" with title "${title}" sound name "Tink"'`
  );
};

const getEorzeaTime = ({ minute, second }) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minute);
  date.setSeconds(date.getSeconds() + second);
  return new eorzea_time(date);
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

const notifyIfNeed = () => {
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

  const eorzeaTimeNow = new eorzea_time();
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

;// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fs");
;// CONCATENATED MODULE: external "fs/promises"
const promises_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fs/promises");
;// CONCATENATED MODULE: external "url"
const external_url_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("url");
;// CONCATENATED MODULE: ./src/update-data.mjs





const PLUGIN_FILE_PATH = (0,external_url_namespaceObject.fileURLToPath)(import.meta.url);
const CONFIG_FILE_PATH = `${PLUGIN_FILE_PATH}.vars.json`;

const saveData = async (data) => {
  const dataString = JSON.stringify(data);
  try {
    await (0,promises_namespaceObject.writeFile)(CONFIG_FILE_PATH, dataString);
  } catch (e) {
    console.log("error", e);
  }
};

const refreshPlugin = () => {
  (0,external_child_process_namespaceObject.exec)("open xbar://app.xbarapp.com/refreshAllPlugins");
  // exec(
  //   `open xbar://app.xbarapp.com/refreshPlugin?path=${path.basename(
  //     PLUGIN_FILE_PATH
  //   )}`
  // );
};

const update = async (key, value) => {
  // default data
  const data = { NOTIFY_TARGET: "", NOTIFY_BEFORE: "1min", DND: false };

  // load data
  if ((0,external_fs_namespaceObject.existsSync)(CONFIG_FILE_PATH)) {
    const dataString = await (0,promises_namespaceObject.readFile)(CONFIG_FILE_PATH);
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

;// CONCATENATED MODULE: ./src/eorzea-time.1s.mjs






if (external_process_namespaceObject.argv.length === 3) {
  update(external_process_namespaceObject.argv[2]); // DND
} else if (external_process_namespaceObject.argv.length === 4) {
  update(external_process_namespaceObject.argv[2], external_process_namespaceObject.argv[3]);
} else {
  notifyIfNeed();
  display();
}

})();

