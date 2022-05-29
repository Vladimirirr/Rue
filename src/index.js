import { compile } from './dom/index.js'
import { observe } from './reactify/index.js'
import { deepClone } from './utils/utils.js'

export default class Rue {
  constructor(opts) {
    // $ 私有属性
    // _ 只读属性
    this.$el = document.querySelector(opts.el)
    this.$data = deepClone(opts.data)
    this.$methods = opts.methods
    this.$lifecycle = opts.lifecycle ?? {}
    this.$opts = opts

    // 响应式
    observe(this.$data, this)

    // created
    this.$lifecycle?.created.call(this)

    // 编译指令和初始化视图
    compile(this.$el, this)

    // mounted
    this.$lifecycle?.mounted.call(this)

    // 代理数据
    this.proxyData(this.$data)
  }
  proxyData(data) {
    for (const x in data) {
      Object.defineProperty(this, x, {
        get() {
          return data[x]
        },
        set(newValue) {
          data[x] = newValue
        },
      })
    }
  }
}
