const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'yjkmui': './src/comps/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../packages'),
    publicPath: '/packages/',
    library: 'yjkmui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // css: 'vue-style-loader!css-loader',
            // sass: 'vue-style-loader!css-loader!sass-loader'
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            }),
            sass: ExtractTextPlugin.extract({
              use: 'css-loader!sass-loader',
              fallback: 'vue-style-loader'
            })
          },
          postLoaders: {
            html: 'babel-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: false
            }
          },
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-nested'),
                  require('postcss-preset-env'),
                  require('postcss-simple-vars')
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??,*$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: process.env.NODE_ENV === 'production' ? '[name].[contenthash:7].css' : 'yjkmui.css',
      allChunks: true
    })
  ]
}
