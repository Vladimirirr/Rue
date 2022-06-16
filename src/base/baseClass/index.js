import patch from '@/vdom/patchGenerator'

import {
  instancePrefix,
  placePrefix,
} from '@/constants/prefix.js'

/**
 * 组件的基类
 */
export default class baseClass {
  // 组件实例标识符前缀
  instancePrefix = instancePrefix
  // 组件坑位标识符前缀
  placePrefix = placePrefix
  // snabbdom 的 patch 函数
  patch(...args){
    return patch(...args)
  }
}
