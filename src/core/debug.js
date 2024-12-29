import { _$mode } from "./setup.js";

export function log(message, ...args) {
  if (_$mode !== "prod") {
    console.log(`SCRIPT-QORK:Log: ${message}`, ...args);
  }
}
