import Rue from '@/index.js'
import App from './App.jsx'

import { h } from '@/vdom/h.js'

window.indexEnter = new Rue({
  mountPoint: '#app',
  render() {
    console.log('indexEnter render')
    return h('div', {}, h(App, { parent: this }, []))
  },
})
