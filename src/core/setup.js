import { log } from "./debug.js";
import { Executor } from "./executor.js";
import { _$getComponents } from "./utils.js";

export let _$executor = null;
export let _$mode = null;

export const _$setup = (config) => {
  let prefix = config.prefix ?? "_script";
  let executorName = config.executor ?? "_executor_";
  _$mode = config.mode ?? "dev";

  let components = _$getComponents();
  if (!Array.isArray(components)) return;

  // eslint-disable-next-line no-const-assign
  _$executor = new Executor(executorName);

  function findHiddenComponentsIterative(components, prefix) {
    const hiddenComponents = [];
    const stack = [...components]; // Use a stack for iterative traversal

    while (stack.length > 0) {
      const component = stack.pop(); // Get the last component from the stack

      if (
        component.type === "hidden" &&
        typeof component.key === "string" &&
        component.key.startsWith(prefix) &&
        component.defaultValue
      ) {
        hiddenComponents.push(component); // Add matching hidden component
      } else if (
        ["panel", "field-group"].includes(component.type) &&
        Array.isArray(component.components)
      ) {
        stack.push(...component.components); // Add nested components to the stack
      } else if (
        component.type === "columns" &&
        Array.isArray(component.columns) // Add nested components for columns
      ) {
        component.columns.forEach((col) => {
          stack.push(...col.components);
        });
      }
    }

    return hiddenComponents;
  }

  let scriptComponents = findHiddenComponentsIterative(components, prefix);
  log(`Number of scripts: ${scriptComponents.length}`);

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
