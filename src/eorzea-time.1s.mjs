#!/usr/bin/env node

import { argv } from "process";
import { display } from "./display.mjs";
import { notifyIfNeed } from "./notify.mjs";
import { update } from "./update-data.mjs";

if (argv.length === 3) {
  update(argv[2]); // DND
} else if (argv.length === 4) {
  update(argv[2], argv[3]);
} else {
  notifyIfNeed();
  display();
}
