import React from 'react'
import { render } from 'react-dom'
import '@utils/resize'
import '@utils/vconsole'
import locales from '@locales/index'

import Main from './main'

window.onload = function () {
  intl.init({
    currentLocale: window.lang,
    locales
  })

  document.title = intl.get('title')
  document.querySelector('html').lang = window.lang

  render(<Main />, document.getElementById('app'))
}
