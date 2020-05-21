import React from 'react'
import { render } from 'react-dom'
import '@utils/resize'
import '@utils/vconsole'
import intl from 'react-intl-universal'

import Main from './main'
import locales from '@locales/index'

window.onload = function () {
  intl.init({
    currentLocale: window.lang,
    locales
  })

  document.title = intl.get('cplist')
  document.querySelector('html').lang = window.lang

  render(<Main />, document.getElementById('app'))
}
