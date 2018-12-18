const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js"
  },

  devServer: {
    disableHostCheck: true,
    compress: false,
    host: "0.0.0.0",
    port: 3000
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  watchOptions: {
    ignored: ["dist", "node_modules"]
  },

  watch: true,

  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html"
    })
  ]
};
