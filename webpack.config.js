/*
    ./webpack.config.js
*/
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {path: __dirname, filename: 'bundle.js'},
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ ,query:{presets:['es2015','react','stage-2']}},
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ ,query:{presets:['es2015','react','stage-2']}},
      { test: /\.(|otf|eot|svg|ttf|woff|woff2)$/, loader:'file-loader?name=../src/resources/font/[name].[ext]'},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=25000'}
    ]
  }
}
