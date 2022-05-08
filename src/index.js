import { compile } from './dom/index.js'
import { observe } from './reactify/index.js'

export default class Rue {
  constructor(opts) {
    // $ 私有属性
    // _ 只读属性
    this.$el = document.querySelector(opts.el)
    this.$data = opts.data
    this.$methods = opts.methods
    this.$opts = opts
    // 响应式
    observe(this.$data)
    // 编译指令和初始化视图
    compile(this.$el, this)
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
