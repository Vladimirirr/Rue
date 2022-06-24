/**
 * 订阅者，观察者，观察依赖的变化执行对应的操作
 */

import { parsePath } from '../utils/utils.js'
import { pushTarget, popTarget } from './Dep.js'

export class Watcher {
  /**
   * @param {*} data 依赖数据对象
   * @param {*} expression 依赖的值
   * @param {*} cb 依赖变化时的行为
   */
  constructor(data, expression, cb) {
    // 初始化
    this.data = data
    if (typeof expression === 'function') {
      this.getter = expression
    } else {
      this.getter = parsePath(expression) // 生成一个读取对象特定路径的函数
    }
    this.cb = cb

    // 取值
    this.value = this.get({ init: true }) // 初始化watcher时立刻订阅依赖
  }
  get({ init }) {
    // 只在初始化 watcher 的时候收集依赖
    // TODO 存在问题，如果一个依赖根据条件真假在render读取会导致无法响应式
    init && pushTarget(this)
    const value = this.getter(this.data) // 获取最新的值
    init && popTarget(this)
    return value
  }
  update() {
    const value = this.get({ init: false }) // 不要再触发依赖收集
    if (value !== this.value) {
      const oldValue = this.value
      const newValue = value
      this.value = newValue
      this?.cb?.call(this.data, oldValue, newValue)
    }
  }
}
