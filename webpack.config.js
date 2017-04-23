const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    nintendo: path.resolve(__dirname, 'src/js/nintendo.jsx'),
    sony: path.resolve(__dirname, 'src/js/sony.jsx'),
    microsoft: path.resolve(__dirname, 'src/js/microsoft.jsx'),
    common: ['react', 'react-dom']
  },
  module: {
    rules: [{
      test: /\.(jsx|js)$/,
      exclude: /(node_modules)/,
      use: ['babel-loader']
    }, {
      test: /\.css$/,
      include: path.resolve(__dirname, 'src/css'),
      use: ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash:7].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].[chunkhash:7].css'
    }),
    new HtmlWebpackPlugin({
      chunks: ['nintendo', 'common'],
      filename: 'html/nintendo.html',
      title: 'Hello Nintendo',
      minify: {
        collapseWhitespace: false,
        removeComments: true
      },
      template: path.resolve(__dirname, 'src/html/base.html')
    }),
    new HtmlWebpackPlugin({
      chunks: ['sony', 'common'],
      filename: 'html/sony.html',
      title: 'Hello Sony',
      minify: {
        collapseWhitespace: false,
        removeComments: true
      },
      template: path.resolve(__dirname, 'src/html/base.html')
    }),
    new HtmlWebpackPlugin({
      chunks: ['microsoft'],
      filename: 'html/microsoft.html',
      title: 'Hello Microsoft',
      minify: {
        collapseWhitespace: false,
        removeComments: true
      },
      template: path.resolve(__dirname, 'src/html/base.html')
    })
  ]
};
