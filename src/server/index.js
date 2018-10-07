import React from 'react'
import { renderToString, renderToStaticNodeStream } from 'react-dom/server'
import Html from './Html'
import App from '../shared/app'

export default ({ clientStats, inlineCss }) => async (req, res, next) => {
  

  const app = (<App />)

  const content = renderToString(app)

  const props = {
    content,
    clientStats,
    inlineCss,
  }

  const element = <Html {...props} />

  const stream = renderToStaticNodeStream(element)

  res.type('html')

  res.write('<!doctype html>')

  stream.pipe(res)
}
