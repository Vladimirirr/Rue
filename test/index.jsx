import Rue from '@/index.js'
import App from './App.jsx'

import { h } from '@/vdom/h.js'

const React = {
  // 模拟 React.createElement
  createElement: h,
}

window.App = new Rue({
  mountPoint: '#app',
  render() {
    return <App parent={this}></App>
  },
})
