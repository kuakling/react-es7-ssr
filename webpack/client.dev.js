const resolvePath = path => require('path').resolve(__dirname, path)
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./client.common.js')

const clientConfig = merge( common, {
  mode: 'development',
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
  ],
  output: {
    path: resolvePath('../dist-dev/client'),
    filename: 'js/[name].js',
    publicPath: process.env.REACT_APP_BASE_URL ? `/${process.env.REACT_APP_BASE_URL}/` : '/',
  },
  optimization: {
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css"
    }),
  ]
})

module.exports = clientConfig