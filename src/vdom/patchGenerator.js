// github: https://github.com/snabbdom/snabbdom/

import {
  init,
  classModule, // 开启 class 功能，使用 class 键，例如 { class: { selected: true, active: true } }，相当于标签的 className="selected active"
  propsModule, // 支持 dom 的 properties，使用 props 键
  attributesModule, // 支持 dom 的 attributes，使用 attrs 键
  datasetModule, // 支持 data-set，使用 dataset 键，例如 { dataset: { age: 22 } }，相当于标签的 data-set="22"
  styleModule, // 支持内联样式，使用 style 键
  eventListenersModule, // 支持事件监听，使用 on 键，例如 { on: { click: function } }
} from 'snabbdom'

import handleComponentVNodeModule from './modules/handleComponentVNodeModule.js'

// 通过传入模块初始化 patch 函数
const basic = [classModule, propsModule, styleModule, eventListenersModule]
const preset = {
  basic,
  full: [...basic, attributesModule, datasetModule, handleComponentVNodeModule],
}

export const patchGenerator = (level) => init(preset[level])

export default init(preset.full)
