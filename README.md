# Script-qork: JavaScript Scripts

## Plugin Description

This plugin enables scripting in JavaScript within the Unqork environment, replacing the need for the heavy Data Workflow component. It is based on the existing Unqork component tree, which describes all components on a page using JSON. Each component contains example key data such as:

- **type**
- **key**
- **defaultValue**

and the `execute` method, which triggers the appropriate action on the component.

The plugin uses the `execute` method of "hidden" components. By default, this method has no body, so invoking it has no effect. The plugin:

1. Finds all "hidden" components with a specific prefix (e.g., `_script`). The prefix can be defined in the configuration.
2. Retrieves the `defaultValue` and replaces the `execute` method with a function that executes the code in `defaultValue` using `eval`:
   ```javascript
   Object.assign(component, {
     execute: new Function(code),
   });
   ```
3. After the change, invoking the `execute` method again (e.g., `<hidden>, trigger, GO`) executes the code stored in `defaultValue`.

## Installation

1. Build the plugin using the command `npm run build`.
2. Follow the steps outlined in the Configuration section to set up the required components and options.

## Configuration

The plugin requires a few configuration steps to set up correctly:

1. **Component Configuration**:

   - Create a **content** component and insert the following script:
     ```javascript
     <script async>
       <#-- built-code-main-js --#>
     </script>
     ```
   - Create an **Initializer** component with a propertyId matching the name provided in the configuration. The default name is `_executor_`.

2. **Script Configuration**:
   - In the `src/core/index.js` file, use the `_$setup(config)` method to set up the following options:
     - **prefix**: Defines the prefix that distinguishes scripts from components. Default: `_script`.
     - **executorName**: Specifies the name of the executor component that triggers actions. Default: `_executor_`.

## Usage

After proper configuration, you can use JavaScript scripts in Unqork:

1. Create a **hidden** component with a propertyId starting with the prefix specified in the configuration, e.g., `_scriptCountClicks`.
2. Write your script using the internal API and wrap it in curly braces, e.g.:

   ```javascript
   {
     let script = input("number");
     script = Number(script) + 1;
     output([{ id: "number", type: "value", value: script }]);
   }
   ```

3. Place the code in the **defaultValue** field of the hidden component.
4. Trigger an action in the Unqork tool for the hidden component with the appropriate prefix, e.g.:  
   `'_scriptCountClicks, trigger, GO'`.

## Plugin API

The following methods are available for scripting:

### `input(inputName)`

Fetches data from the "data" tree based on the component's property identifier.

**Example:**

```javascript
const value = input("propertyId");
```

### `output([rule])`

Emulates the output behavior of the Data Workflow component. Accepts an array of objects, where each object should have the following structure:

- **id**: The output name.
- **type**: The value type.
- **value**: The output value.
- **formula**: (Optional) A formula for processing the value, e.g., using libraries like lodash.

**Example:**

```javascript
output([{ id: "pluginTest", type: "trigger", value: "GO" }]);
```

### `trigger(componentName)`

Triggers an action on another component based on its name.

**Example:**

```javascript
trigger("componentKey");
```

## Summary

This plugin significantly simplifies logic in Unqork, allowing the use of flexible and powerful JavaScript scripts. It leverages the existing component architecture and their `execute` method to efficiently run any code assigned in the `defaultValue` field.
