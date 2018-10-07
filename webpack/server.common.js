const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./base')

module.exports = merge(base, {
  name: 'server',
  target: 'node',
  externals: {
    'node-fetch': 'isomorphic-fetch'
  },
  module: {
    rules: [
      {
        test: /\.(styl|css)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              module: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
        ]
      },
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.DefinePlugin({
      IS_SERVER: true
    }),
  ],
})