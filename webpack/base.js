const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const base = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: [
            ["@babel/preset-react"],
          ],
          plugins: [
            ["@babel/plugin-proposal-class-properties", { "loose": true }]
          ],
        }
      },
      {
        test: /\.(gif|ico|jpg|png|svg)$/,
        loader: 'url-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'app-src': path.resolve(__dirname, '..', 'src'),
      'app-static': path.resolve(__dirname, '..', 'static'),
      'app-components': path.resolve(__dirname, '..', 'src', 'shared', 'components'),
    }
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ],
}

module.exports = base