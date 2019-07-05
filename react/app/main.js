import React from 'react'
import { render } from 'react-dom'
import App from './views/app'

window.onload = function () {
  render(<App />, document.getElementById('main'))
}
