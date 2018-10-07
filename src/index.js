require('@babel/polyfill')
require('dotenv').config()
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const express = require('express')

const baseUrl = process.env.REACT_APP_BASE_URL ? `/${process.env.REACT_APP_BASE_URL}` : ''

const app = express()

app.use(`${baseUrl}/static`, express.static(path.resolve(__dirname, '../static')))

const DEV = process.env.NODE_ENV === 'development'

let isBuild = false

const done = () => {
  return !isBuild && app.listen(4000, () => {
    isBuild = true
    console.log('Listening @ http://localhost:4000')
  })
}

const serverRendererOptions = {
  inlineCss: fs.readFileSync(path.resolve(__dirname, 'server', 'css', 'main.css'), 'utf8').replace(/\s+/g, " ").trim()
}

if (process.env.SERVE === 'true') {
  const clientConfig = require('../webpack/client.prod')
  const publicPath = clientConfig.output.publicPath
  const outputPath = clientConfig.output.path

  const clientStats = require('../dist/client/stats.json')
  const serverRender = require('../dist/server/mainServer.js').default
  app.use(publicPath, express.static(outputPath))
  app.use(serverRender({ clientStats, ...serverRendererOptions }))

  done()
} else {
  if (DEV) {
    const clientConfig = require('../webpack/client.dev')
    const serverConfig = require('../webpack/server.dev')

    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware')

    const compiler = webpack([clientConfig, serverConfig])
    const clientCompiler = compiler.compilers[0]

    app.use(webpackDevMiddleware(compiler))
    app.use(webpackHotMiddleware(clientCompiler))
    app.use(webpackHotServerMiddleware(compiler, { serverRendererOptions }))

    compiler.plugin('done', done)
  } else {
    const clientConfig = require('../webpack/client.prod')
    const serverConfig = require('../webpack/server.prod')
    const publicPath = clientConfig.output.publicPath
    const outputPath = clientConfig.output.path

    const compiler = webpack([clientConfig, serverConfig])
    compiler.run((err, stats) => {
      if (err) {
        console.log('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }
      if (process.env.RUN === 'true') {
        const clientStats = stats.toJson().children[0]
        const serverRender = require('../dist/server/mainServer.js').default
        app.use(publicPath, express.static(outputPath))
        app.use(serverRender({ clientStats, ...serverRendererOptions }))

        done()
      } else {
        console.log('Build Complete')
      }

    })
  }
}