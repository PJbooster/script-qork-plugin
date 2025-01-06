import * as libMethods from "./core/index.js";

// Expose each method to window globally
Object.keys(libMethods).forEach((methodName) => {
  window[methodName] = libMethods[methodName];
});
