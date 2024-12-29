import { _$getComponent, _$getSubmission } from "./utils.js";
import { _$executor } from "./setup.js"; // Adjust the path based on your file structure

// Improved input function
const input = (inputName) => {
  const data = _$getSubmission().data; // Retrieve submission data from _$getSubmission()
  return data[inputName] ?? null; // Fixed the error, using 'inputName' instead of the undefined 'inputData'
};

// Improved output function
const output = (rules) => {
  if (_$executor) _$executor.executeRules(rules);
};
// Improved trigger function
const trigger = (componentName) => {
  if (!componentName) {
    console.error("Component name is required."); // Handle case where componentName is not provided
    return;
  }

  let component = _$getComponent(componentName); // Get the component

  if (component && typeof component.execute === "function") {
    component.execute(); // Call the execute method if it exists
  } else {
    console.error(
      `Trigger ${componentName} error: execute function not found.`
    ); // Handle case where component or execute method is not found
  }
};

// Exporting functions for use in other files
export { input, output, trigger };
