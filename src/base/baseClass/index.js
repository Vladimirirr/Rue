import { getUid } from '@/utils/utils.js'
import patch from '@/vdom/patchGenerator'

/**
 * 组件的基类，组件的全部公共方法
 */
export default class baseClass {
  // 组件实例标识符前缀
  instancePrefix = '__rue_instance__'
  // 组件坑位标识符前缀
  placePrefix = '__rue_place__'
  getUid() {
    return getUid()()
  }
  patch(...args){
    return patch(...args)
  }
}
