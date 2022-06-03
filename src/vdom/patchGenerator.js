// github: https://github.com/snabbdom/snabbdom/

import {
  init,
  classModule, // 开启 class 功能
  propsModule, // 支持 dom 的 properties
  attributesModule, // 支持 dom 的 attributes
  datasetModule, // 支持 data-set，比如 <div dataset={foo: 20}>...</div>
  styleModule, // 支持内联样式
  eventListenersModule, // 支持事件监听
} from 'snabbdom'

// 通过传入模块初始化 patch 函数
const basic = [classModule, propsModule, styleModule, eventListenersModule]
const preset = {
  basic,
  full: [...basic, attributesModule, datasetModule],
}

export const patchGenerator = (level) => init(preset[level])

export default init(preset.basic)
