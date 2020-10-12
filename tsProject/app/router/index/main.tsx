import React, { useState, useEffect, useMemo, useCallback } from 'react'
import style from './index.css'
import request from '@utils/request'

import Footer from './components/footer/index'

const LANG: string = window.lang

const Main = () => {
  useEffect(() => {
    // get data
  }, [])

  return (
    <div>
      main
      <Footer />
    </div>
  )
}

export default Main

