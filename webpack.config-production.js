const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    popup: './popup.js',
    background: './background.js',
    worker: './worker.js'
  },
  output: {
    path: __dirname + '/app',
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['stage-3', 'stage-0', 'es2017', 'react', 'es2017', 'es2015'],
          plugins: ['transform-runtime']
        }
      }, {
        test: /\.(sass|scss)$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.(woff2?|eot|ttf|svg)$/,
        loaders: ['url']
      }
    ]
  }
};
