// docs: https://github.com/snabbdom/snabbdom/blob/HEAD/README-zh_CN.md

import {
  init,
  classModule,
  propsModule,
  attributesModule,
  datasetModule,
  styleModule,
  eventListenersModule,
} from 'snabbdom'

import { random as _random } from 'lodash'

import Hello from './components/Hello.jsx'

try {
  // console.log(Hello())
  // console.log(Hello.toString())
  console.log('Hello is transformed from JSX to h successfully')
} catch (err) {
  console.error(err)
}

const patch = init([
  // 通过传入模块初始化 patch 函数
  classModule, // 开启 class 功能
  propsModule, // 支持 dom 的 properties
  attributesModule, // 支持 dom 的 attributes
  datasetModule, // 支持 data-set，比如 <div dataset={foo: 20}>...</div>
  styleModule, // 支持内联样式
  eventListenersModule, // 支持事件监听
])

// 第一次patch的时候，传入的旧VNode是实际的dom元素
var lastVNode = Hello() // lastVNode 记录上一次 VNode

// 首次渲染
patch(container, lastVNode)

// 在全局挂载一个改变 VNode 的方法
window.updateComponent = () => {
  const namePool = ['jack', 'bruce', 'rechard', 'luice', 'vamm', 'ryzz']
  const getNameFromPool = () => _random(0, namePool.length - 1)
  const name = namePool[getNameFromPool()]
  const msgList = Array(_random(0, 4))
    .fill(0)
    .map(getNameFromPool)
    .map((i) => ({
      key: _random(0, 1024, true),
      value: `hello ${namePool[i]}`,
    }))
  const newVNode = Hello({ name, msgList })
  patch(lastVNode, newVNode) // 更新
  lastVNode = newVNode
}
