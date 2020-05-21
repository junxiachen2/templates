import React, { useState, useEffect, useMemo, useCallback } from 'react'
import style from './index.css'
import { nativeToast } from '@utils/native'
import { transformWebp } from '@utils/utils'
import { API_getList } from '@config/api'
import request from '@utils/request'

import Footer from './components/footer'

const LANG = window.lang

const Main = () => {
  const getList = async () => {
    const res = await request({
      url: API_getList,
      params: {}
    })
    const { err, err_msg, data } = res
    if (err === 0) {

    }
    else {
      nativeToast(err_msg)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <div className={style[`banner-${LANG}`]}></div>

      <Footer />
    </>
  )
}

export default Main

