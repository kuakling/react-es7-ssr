import React from 'react'
import ReactDOM from 'react-dom'
import App from '../shared/app'
import config from '../shared/core/config'

const { appContainerId } = config

const render = App => {
  ReactDOM.hydrate(
    <App />,
    document.getElementById(appContainerId)
  )
}

render(App)