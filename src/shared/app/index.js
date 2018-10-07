import React, { Component } from 'react'
import './app.css'

export default class App extends Component {
  componentDidMount = () => {
    const ele = document.getElementById('loading-indicator')
    const loaderText = document.getElementById('loader-text')
    if (ele) {
      // fade out
      ele.classList.add('available')
      loaderText.innerText = 'Complete'
      setTimeout(() => {
        // ele.classList.add('available')
        // remove from DOM
        ele.outerHTML = ''
      }, 1000)
    }
  }

  test = () => {
    alert('TEST')
  }
  
  render() {
    return (
      <div>
        Hello React {React.version}<br />
        <button onClick={this.test} className="btn">Test button</button>
      </div>
    )
  }
}
