const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  entry: "./src/client/index.js",
  output: {
    libraryTarget: "var",
    library: "Client"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html"
    }),
    new webpack.DefinePlugin({
      app_port: dotenv.parsed.APP_PORT
    })
  ]
};
