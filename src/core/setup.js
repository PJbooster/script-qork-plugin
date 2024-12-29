import { Executor } from "./executor.js";
import { _$getComponents } from "./utils.js";

export let _$executor = null;

export const _$setup = (config) => {
  let prefix = config.prefix ?? "_script";
  let executorName = config.executor ?? "_executor_";

  let components = _$getComponents();
  if (!Array.isArray(components)) return;

  // eslint-disable-next-line no-const-assign
  _$executor = new Executor(executorName);

  let scriptComponents = components.filter(
    (component) =>
      typeof component.key === "string" && component.key.startsWith(prefix)
  );

  scriptComponents.forEach((component) => {
    let code = component.defaultValue;
    if (code) {
      try {
        // Assign an "execute" function to the component
        Object.assign(component, {
          execute: new Function(code),
        });
      } catch (error) {
        console.error(
          `Failed to create execute function for component:`,
          component,
          error
        );
      }
    }
  });
};
