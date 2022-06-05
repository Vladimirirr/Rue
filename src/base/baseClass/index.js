import { getUid } from '@/utils/utils.js'

/**
 * 组件的基类，组件的全部公共方法
 */
export default class baseClass {
  getUid() {
    return getUid()()
  }
}
