import React from 'react'
import style from './index.css'

const LANG: string = window.lang

const Footer = () => {
  return (
    <div className={style[`footer-${LANG}`]}></div>
  )
}

export default Footer

