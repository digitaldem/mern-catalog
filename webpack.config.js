var path = require('path');
var webpack = require('webpack');
var package = require('./package.json')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NAME': JSON.stringify(package.name),
        'VERSION': JSON.stringify(package.version),
        'NODE_ENV': JSON.stringify('development'),
        'PORT': JSON.stringify(process.env.PORT)
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [path.join(__dirname, 'index'), path.join(__dirname, 'app')]
    }, {
      test: /\.json$/,
      loaders: ['json'],
      include: [path.join(__dirname, 'mocks'), path.join(__dirname, 'node_modules')]
    }]
  }
};
