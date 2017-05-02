const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    nintendo: path.resolve(__dirname, 'src/js/nintendo.jsx'),
    sony: path.resolve(__dirname, 'src/js/sony.jsx'),
    microsoft: path.resolve(__dirname, 'src/js/microsoft.js'),
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
      names: ['common', 'manifest']
    }),
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].[chunkhash:7].css'
    }),
    new HtmlWebpackPlugin({
      chunks: ['nintendo', 'common', 'manifest'],
      filename: 'html/nintendo.html',
      title: 'Hello Nintendo',
      minify: {
        collapseWhitespace: false,
        removeComments: true
      },
      template: path.resolve(__dirname, 'src/html/base.html')
    }),
    new HtmlWebpackPlugin({
      chunks: ['sony', 'common', 'manifest'],
      filename: 'html/sony.html',
      title: 'Hello Sony',
      minify: {
        collapseWhitespace: false,
        removeComments: true
      },
      template: path.resolve(__dirname, 'src/html/base.html')
    }),
    new HtmlWebpackPlugin({
      // chunks: ['microsoft', 'manifest'],
      // chunksSortMode: (chunk1, chunk2) => {
      //   let orders = ['manifest', 'microsoft'];
      //   let order1 = orders.indexOf(chunk1.names[0]);
      //   let order2 = orders.indexOf(chunk2.names[0]);
      //   if (order1 > order2) {
      //     return 1;
      //   } else if (order1 < order2) {
      //     return -1;
      //   } else {
      //     return 0;
      //   }
      // },
      chunks: ['microsoft', 'common', 'manifest'],
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
