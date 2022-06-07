const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('./merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig('development'), {
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    hot: true,
    static: resolve(__dirname, '../dist'),
    devMiddleware: {
      publicPath: '/',
    },
    historyApiFallback: {
      disableDotRule: true,
    }
  },
  devtool: 'source-map',
});
