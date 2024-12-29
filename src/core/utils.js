import { SCRIPTCORK_UNQORK_ROOT_CLASS } from "./const.js";

// Function to get the scope
const _$getScope = () => {
  return angular.element(SCRIPTCORK_UNQORK_ROOT_CLASS).scope();
};

// Function to get the form from the scope
const _$getForm = () => {
  let form = _$getScope().form;
  return form ?? null;
};

// Function to get components from the form
const _$getComponents = () => {
  let form = _$getForm();
  if (form && form.components) {
    return form.components;
  }
  return null;
};

// Function to get a specific component by name
const _$getComponent = (componentName) => {
  let components = _$getComponents();
  if (!components) return null;

  if (Array.isArray(components)) {
    return components.find((component) => component.key === componentName);
  }

  return null;
};

// Function to get the submission from the scope
const _$getSubmission = () => {
  let scope = _$getScope();
  if (scope && scope.submission) {
    return scope.submission; // Return the submission if it exists
  }
  return null; // If no submission is found, return null
};

// Export the functions for use in other files
export {
  _$getScope,
  _$getForm,
  _$getComponents,
  _$getComponent,
  _$getSubmission,
};
