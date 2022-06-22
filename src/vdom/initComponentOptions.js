// 初始化 和 格式化 组件的配置对象

import { isComponentOptionsInited } from "@/constants/component.js"

// 组件 uid
var uid = 0

const initComponentOptions = (componentOptions) => {
  if (componentOptions[isComponentOptionsInited]) return
  // 组件的唯一标识
  componentOptions.uid = uid++
  // 标记已处理过此组件
  componentOptions[isComponentOptionsInited] = true
}

export default initComponentOptions
