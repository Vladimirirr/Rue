import patch from '@/vdom/patchGenerator.js'

/**
 * 组件的基类，组件的全部公共方法
 */
export default class baseClass {
  patch(...args) {
    return patch(...args)
  }
  update() {
    // 子类要重写此方法
    throw new Error('overriden required for update on baseClass')
  }
  mount() {
    // 子类要重写此方法
    throw new Error('overriden required for mount on baseClass')
  }
  unmount() {
    // 子类要重写此方法
    throw new Error('overriden required for unmount on baseClass')
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
