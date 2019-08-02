const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./package.config')
module.exports = merge(baseWebpackConfig, {
  output: {
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ]
})