import { compile } from './dom/index.js'
import { observe } from './reactify/index.js'

export default class Rue {
  constructor(opt) {
    this.$el = opt.el
    this.$data = opt.data
    this.$methods = opt.methods
    this.$opt = opt
    // 响应式
    observe(this.$data)
    // 编译指令和初始化视图
    compile(this.$el, this)
    // 代理数据
    this.proxyData(this.$data)
  }
  proxyData(data) {
    for (let x in data) {
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
