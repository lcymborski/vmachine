const { resolve } = require('path');
const merge = require('./merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig('production'), {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: resolve(__dirname, '../dist'),
    clean: true,
    publicPath: '/'
  },
});
