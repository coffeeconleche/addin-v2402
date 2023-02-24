const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/app/addinTest.html",

      filename: "./addinTest.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "addinTest.js",
  },
};
