const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const utils = require('./utils');
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/; //这一句和下一句是新增的less的配置
const lessModuleRegex = /\.module\.less$/;


module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    index: path.resolve(__dirname, '../src/index.jsx'),
    log: path.resolve(__dirname, '../src/log.jsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist/web'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.[t|j]sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  plugins: [
    // 添加 MiniCssExtractPlugin 插件
    new MiniCssExtractPlugin({
      // 选项配置
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    // 可以添加其他的插件
  ],
}
