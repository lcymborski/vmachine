const { resolve } = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const SERVER_NAME = process.env.SERVER_NAME || 'localhost'

const getApiRoot = () => {
  const subdir = ''
  return SERVER_NAME.startsWith('localhost')
    ? JSON.stringify(`http://${SERVER_NAME}:3000/${subdir}api/`)
    : JSON.stringify(`https://${SERVER_NAME}/${subdir}api/`)
}

module.exports = (mode = 'development') => ({
  mode,

  ...(mode === 'production'
    ? {
        optimization: {
          usedExports: true,
          concatenateModules: true,
          chunkIds: 'total-size',
          moduleIds: 'size',
          runtimeChunk: 'single',
          splitChunks: {
            cacheGroups: {
              defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all',
              },
            },
          },
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                sourceMap: true,
                compress: true,
                output: {
                  comments: false,
                  beautify: false,
                },
              },
            }),
            new CssMinimizerPlugin(),
          ],
        },
        performance: {
          hints: false,
        },
      }
    : {}),

  entry: [
    ...(mode === 'production'
      ? []
      : ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server']),
    resolve(__dirname, '../src/index.tsx'),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
        sideEffects: true,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|\.spec\.js/,
        use: ['eslint-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        exclude: /(node_modules|bower_components|dist)/,
      },
      {
        test: /\.css$/,
        use: [
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|woff2?|woff|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash][ext][query]',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    alias: {
      '~components': resolve(__dirname, '../src/components/'),
      '~containers': resolve(__dirname, '../src/containers/'),
      '~types': resolve(__dirname, '../src/types/'),
      '~lib': resolve(__dirname, '../src/lib/'),
      '~store': resolve(__dirname, '../src/store/'),
      '~api': resolve(__dirname, '../src/store/api/'),
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      __APIROOT__: getApiRoot(),
    }),

    ...(mode === 'production'
      ? [
          new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[name].[contenthash].css',
          }),
        ]
      : [new webpack.HotModuleReplacementPlugin()]),

    // index.html
    new HtmlWebpackPlugin({
      title: 'Vending machine',
      template: resolve(__dirname, '../src/assets/index.ejs'),
      filename: 'index.html',
      hash: true,
      minify: {
        collapseWhitespace: true,
      },
      chunksSortMode: 'auto',
    }),
  ],
})
