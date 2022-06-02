// 基类
import baseClass from './base/baseClass.js'

// vnode
import { createEmptyVNode, createDefaultVNode } from './utils/vnode.js'

// 响应式
import { observe, Watcher } from './reactify/index.js'

// 其他
import { cloneDeep, bindMethods } from './utils/utils.js'

export default class Rue extends baseClass {
  constructor(opts) {
    super()
    // 配置项相关
    this.el = document.querySelector(opts.el)
    this.data = cloneDeep(opts.data)
    this.methods = bindMethods(opts.methods, this)
    this.opts = opts

    // 渲染相关
    this.lastVNode = null
    this.render = () => {
      const passToRender = {
        data: this.data,
        methods: this.methods,
      }
      const resultVNode = this.opts?.render?.(passToRender)
      // 返回undefined，将会创建一个默认的空的div
      if (resultVNode === undefined) return createDefaultVNode()
      // 返回null，将会删除这个dom元素
      if (resultVNode === null) return createEmptyVNode()
      return resultVNode
    }
    this.rednerWatcher = null

    // 响应式
    observe(this.data, this)

    // 代理数据
    this.proxyData(this.data)

    // 初始化首次渲染
    this.mount()
  }
  update() {
    const { render } = this
    if (this.lastVNode === null) {
      // 第一次渲染
      this.lastVNode = this.el
    }
    const nowVNode = render()
    this.patch(this.lastVNode, nowVNode)
    this.lastVNode = nowVNode
    // 每次更新都保持组件自身的el最新
    this.el = this.lastVNode.elm
  }
  mount() {
    // 挂载组件
    // 执行 render 函数
    const { render, name } = this.opts
    if (!render) throw new Error(`no render specified for ${name || 'unknown'}`)
    const update = this.update.bind(this)
    // 创建组件重新渲染的 watcher
    this.rednerWatcher = new Watcher(this.data, update, update, 1)
  }
  unmount() {
    // 卸载组件
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
