import patch from './installPatch.js'

/**
 * 组件的基类，组件的全部公共方法
 */
export default class {
  patch(...args) {
    return patch(...args)
  }
  forceUpdate() {
    // 子类要重写此方法
    throw new Error('overriden required for forceUpdate on baseClass')
  }
  nextTick() {
    // 子类要重写此方法
    throw new Error('overriden required for nextTick on baseClass')
  }
}
