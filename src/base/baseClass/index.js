import patch from '@/vdom/patchGenerator.js'
import { getUid } from '@/utils/utils.js'

/**
 * 组件的基类，组件的全部公共方法
 */
export default class baseClass {
  constructor() {
    // 定义组件 uid 的前缀
    Object.defineProperty(this, 'uidPrefix', {
      enumerable: false,
      configurable: false,
      get() {
        return 'componentInstance__'
      },
      set() {},
    })
  }
  patch(...args) {
    return patch(...args)
  }
  getUid() {
    return getUid(this.uidPrefix)()
  }
}
