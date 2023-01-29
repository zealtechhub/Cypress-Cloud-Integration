import path from "path";

export default {
  viewportWidth: 650,
  viewportHeight: 700,
  component: {
    // setupNodeEvents(on: any, config: any) {
    //   const webpack = require("@cypress/webpack-preprocessor");
    //   const options = {
    //     webpackOptions: {
    //       resolve: {
    //         alias: {
    //           "src/components": () => {
    //             console.log({
    //               _dir: path.resolve(__dirname, "./src/component"),
    //             });
    //             return path.resolve(__dirname, "./src/component");
    //           },
    //           "@pages": path.resolve(__dirname, "./src/pages"),
    //           "src/lib": path.resolve(__dirname, "./src/lib"),
    //           "@utils": path.resolve(__dirname, "./src/utils"),
    //           "@styles": path.resolve(__dirname, "./src/styles"),
    //         },
    //       },
    //     },
    //     watchOptions: {},
    //   };

    //   on("file:preprocessor", webpack(options));
    //   return config;
    // },
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
};