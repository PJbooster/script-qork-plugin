import path from "path";

export default {
  entry: "./src/index.js", // Your entry file
  output: {
    filename: "main.js", // Output bundled file name
    path: path.resolve(process.cwd(), "dist"), // Output directory
    clean: true, // Clean dist folder on each build
    library: {
      name: "myLibrary", // Expose all methods under the global 'myLibrary' object
      type: "umd", // Universal Module Definition (works in both browsers, Node, etc.)
    },
  },
  mode: "production", // Use production mode
  module: {
    rules: [
      {
        test: /\.css$/, // Handle CSS files
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
