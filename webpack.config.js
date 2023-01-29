// module.exports = {
//   resolve: {
//     alias: {
//       "src/components": () => {
//         console.log({
//           _dir: path.resolve(__dirname, "./src/component"),
//         });
//         return path.resolve(__dirname, "./src/component");
//       },
//       "@pages": path.resolve(__dirname, "./src/pages"),
//       "src/lib": path.resolve(__dirname, "./src/lib"),
//       "@utils": path.resolve(__dirname, "./src/utils"),
//       "@styles": path.resolve(__dirname, "./src/styles"),
//     },
//   },
// };

var path = require("path");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "src/components": () => {
        console.log({
          _dir: path.resolve(__dirname, "./src/component"),
        });
        return path.resolve(__dirname, "./src/component");
      },
      "@pages": path.resolve(__dirname, "./src/pages"),
      "src/lib": path.resolve(__dirname, "./src/lib"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
};
