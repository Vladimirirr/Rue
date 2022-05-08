/**
 * 订阅者，观察者，观察依赖的变化执行对应的操作
 */

import { parsePath } from '../utils/utils.js'
import { pushTarget, popTarget } from './Dep.js'

export class Watcher {
  constructor(data, expression, cb) {
    // data 依赖数据对象
    // expression 依赖的值
    // 依赖变化时的行为
    this.data = data
    if (typeof expression === 'function') {
      this.getter = expression
    } else {
      this.getter = parsePath(expression) // 生成一个读取对象特定路径的函数
    }
    this.cb = cb

    this.value = this.get({ init: true }) // 初始化watcher时立刻订阅依赖
  }
  get({ init }) { 
    // 只在初始化 watcher 的时候收集依赖
    init && pushTarget(this)
    var value = this.getter(this.data) // 触发依赖收集
    init && popTarget(this)
    return value
  }
  update() {
    var value = this.get({ init: false }) // 不要再触发依赖收集
    // 如果getter是渲染函数，那么value和this.value都是undefined（渲染函数不返回值），不进入if语句
    // 对于数组，由于是引用类型，value !== this.value肯定不成立，所以要修正它
    if (value !== this.value || typeof value === 'object') {
      var oldValue = this.value
      var newValue = value
      this.value = newValue
      this.cb.call(this.data, oldValue, newValue)
    }
  }
  addDep(dep) {

  }
  cleanUpDeps() {

  }
}
