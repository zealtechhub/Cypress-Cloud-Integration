// const webpack = require("@cypress/webpack-preprocessor");

// module.exports = (on, config) => {
//   console.log({ config });

//   const options = {
//     webpackOptions: {
//       resolve: {
//         alias: {
//           "src/components": path.resolve(__dirname, "./src/component"),
//           "src/pages": path.resolve(__dirname, "./src/pages"),
//           "src/lib": path.resolve(__dirname, "./src/lib"),
//           "@utils": path.resolve(__dirname, "./src/utils"),
//           "src/styles": path.resolve(__dirname, "./src/styles"),
//         },
//       },
//     },
//     watchOptions: {},
//   };

//   on("file:preprocessor", webpack(options));
// };

const { startDevServer } = require("@cypress/webpack-dev-server");
const webpackConfig = require("../../webpack.config.js");

module.exports = (on, config) => {
  on("dev-server:start", async (options) =>
    startDevServer({ options, webpackConfig })
  );
  return config;
};
