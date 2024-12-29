import * as libMethods from "./core/index.js";

libMethods._$setup({ prefix: "_script" });
// Expose each method to window globally
Object.keys(libMethods).forEach((methodName) => {
  window[methodName] = libMethods[methodName];
});
