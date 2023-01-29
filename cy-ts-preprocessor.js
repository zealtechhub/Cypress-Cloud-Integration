const wp = require("@cypress/webpack-preprocessor");
const path = require("path");

const webpackOptions = {
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "src/components": () => {
        console.log({ _dir: __dirname });
        return path.resolve(__dirname, "../../src/component");
      },
      "@pages": path.resolve(__dirname, "../../src/pages"),
      "src/lib": path.resolve(__dirname, "../../src/lib"),
      "@utils": path.resolve(__dirname, "../../src/utils"),
      "@styles": path.resolve(__dirname, "../../src/styles"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
};

const options = {
  webpackOptions,
};

module.exports = wp(options);
