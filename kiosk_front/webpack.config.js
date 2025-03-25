const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    pc: "./pc.js",
    webview: "./webview.js",
  },
  module: {
    rules: [
      { 
        test: /\.css$/i, 
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './page1-1.html',
      filename: 'page1-1.html',
    }),
    new HtmlWebpackPlugin({
      template: './page1-2.html',
      filename: 'page1-2.html',
    }),
    new HtmlWebpackPlugin({
      template: './page2.html',
      filename: 'page2.html',
    }),
    new HtmlWebpackPlugin({
      template: './page3.html',
      filename: 'page3.html',
    }),
    new HtmlWebpackPlugin({
      template: './page4.html',
      filename: 'page4.html',
    }),
    new HtmlWebpackPlugin({
      template: './page5.html',
      filename: 'page5.html',
    }),
    new HtmlWebpackPlugin({
      template: './page6.html',
      filename: 'page6.html',
    }),
    new HtmlWebpackPlugin({
      template: './page7.html',
      filename: 'page7.html',
    }),
    new HtmlWebpackPlugin({
        template: './page8.html',
        filename: 'page8.html',
      }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns:[{from: './images', to: 'images/'}]
    }),
  ],
  mode: "development",
};
