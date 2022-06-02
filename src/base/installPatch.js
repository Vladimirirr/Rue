// github: https://github.com/snabbdom/snabbdom/

import {
  init,
  classModule,
  propsModule,
  attributesModule,
  datasetModule,
  styleModule,
  eventListenersModule,
} from 'snabbdom'

const patch = init([
  // 通过传入模块初始化 patch 函数
  classModule, // 开启 class 功能
  propsModule, // 支持 dom 的 properties
  attributesModule, // 支持 dom 的 attributes
  datasetModule, // 支持 data-set，比如 <div dataset={foo: 20}>...</div>
  styleModule, // 支持内联样式
  eventListenersModule, // 支持事件监听
])

export default patch
