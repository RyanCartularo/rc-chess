var path = require("path");
var webpack = require("webpack");

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin("common.js");

module.exports = {
  entry: "./src/header.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "html"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};