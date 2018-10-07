const resolvePath = path => require('path').resolve(__dirname, path)
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./client.common.js')
const StatsWebpackPlugin = require('stats-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const clientConfig = merge( common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: resolvePath('../dist/client'),
    filename: 'js/[name].[hash].js',
    publicPath: process.env.REACT_APP_BASE_URL ? `/${process.env.REACT_APP_BASE_URL}/` : '/',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    runtimeChunk: {
      name: 'bootstrap',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  plugins: [
    new StatsWebpackPlugin('stats.json'),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[hash].css'
    })
  ]
})

module.exports = clientConfig