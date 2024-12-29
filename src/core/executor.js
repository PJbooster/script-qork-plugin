import { _$getComponent } from "./utils.js";

export function Executor(executorName) {
  this.executorName = executorName;
  this.executorComponent = _$getComponent(executorName);

  if (!this.executorComponent) console.error("Cannot find executer component");

  // Use an arrow function to maintain the `this` context
  this.execute = () => {
    this.executorComponent.execute();
  };

  this.executeRules = (outputs, inputs = null) => {
    // Validate the outputs using a private method
    if (!validateOutputs(outputs)) {
      return;
    }

    this.clear();
    this.executorComponent.initializerData.dataOutputObject = outputs;

    // Validate the inputs using a private method (only if inputs are provided)
    if (inputs !== null && validateInputs(inputs)) {
      this.executorComponent.initializerData.dataInputObject = inputs;
    }

    this.execute();
  };

  // Private method to validate outputs
  const validateOutputs = (outputs) => {
    if (!Array.isArray(outputs)) {
      console.error("Outputs must be an array.");
      return false;
    }

    const isValidOutput = outputs.every((output) => {
      return typeof output === "object" && output !== null;
    });

    if (!isValidOutput) {
      console.error(
        "Each output must be an object with string keys: `id`, `type`, and `value`."
      );
      return false;
    }

    return true;
  };

  // Private method to validate inputs
  const validateInputs = (inputs) => {
    if (!Array.isArray(inputs)) {
      console.error("Inputs must be an array.");
      return false;
    }

    return true;
  };

  // Use an arrow function to maintain the `this` context
  this.clear = () => {
    this.executorComponent.initializerData.dataOutputObject = [];
    this.executorComponent.initializerData.dataInputObject = [];
  };
}
