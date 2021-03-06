"use strict";
const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack');

function resolve(dir) {
  return path.resolve(__dirname, '..', dir);
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter')
  }
});

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: "./src/main.js"
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, "../dist/"), //绝对路径
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')

    }
  },
  module: {
    rules: [{
      test: /\.(png|svg|jpg|gif|svg)$/,
      loader: "url-loader",
      exclude: [resolve('src/icons')],
      options: {
        name: "static/images/[name]-[hash:6].[ext]",
        limit: 10000
      }
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      loader: "url-loader",
      options: {
        name: "static/images/[name]-[hash:6].[ext]",
        limit: 10000
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: [
        resolve('src'),
        resolve('node_modules/webpack-dev-server/src'),
        resolve('node_modules/vue-echarts/src')
      ]
    }, {
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
      include: [resolve('src/icons')],
      options: {
        symbolId: 'icon-[name]'
      }
    }]
  },
  performance: {
    hints: 'warning',
    //入口起点的最大体积
    maxEntrypointSize: 50000000,
    //生成文件的最大体积
    maxAssetSize: 30000000,
    //只给出 js 文件的性能提示
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    }
  },
  stats: { //object
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin()
  ]
};