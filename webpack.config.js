const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    hello: path.resolve(__dirname, 'src/js/hello.jsx'),
    world: path.resolve(__dirname, 'src/js/world.jsx'),
    react: ['react', 'react-dom']
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
      name: 'react',
      minChunks: Infinity
    }),
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].[chunkhash:7].css'
    }),
    new HtmlWebpackPlugin({
      chunks: ['hello', 'react'],
      filename: 'html/hello.html',
      title: 'Hello',
      minify: {
        collapseWhitespace: false,
        removeComments: true
      },
      template: path.resolve(__dirname, 'src/html/base.html')
    }),
    new HtmlWebpackPlugin({
      chunks: ['world', 'react'],
      filename: 'html/world.html',
      title: 'World',
      minify: {
        collapseWhitespace: false,
        removeComments: true
      },
      template: path.resolve(__dirname, 'src/html/base.html')
    })
  ]
};
