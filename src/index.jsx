import React from 'react'
import ReactDOM from 'react-dom'
import "@tencent/tea-component-mobile/dist/tea.less";
import Router from './router/index'

export default function createApp() {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  ReactDOM.render(<Router />, container)
}

; ('undefined' != typeof wx && wx.getSystemInfoSync) || createApp()
