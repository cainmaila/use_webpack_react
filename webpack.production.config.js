var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: path.resolve(__dirname, 'app/main.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
            presets: ['es2015', "react"]
        }
    }, {
        test: /\.less$/,
        loader: 'style!css!less'
    }, {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
    }]
  }
};

module.exports = config;
