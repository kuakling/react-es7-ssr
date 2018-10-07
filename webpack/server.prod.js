const resolvePath = path => require('path').resolve(__dirname, path)
const merge = require('webpack-merge')
const common = require('./server.common')

const serverConfig = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: [
    resolvePath('../src/server/index.js')
  ],
  output: {
    libraryTarget: 'commonjs2',
    filename: 'mainServer.js',
    path: resolvePath('../dist/server'),
    publicPath: '/',
  },
})

module.exports = serverConfig