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
    this.mountPoint = null // 挂载点，**此元素将被替换**
    this.el = null // 实例对应的 dom
    this.data = cloneDeep(opts.data) // 实例的状态数据
    this.methods = bindMethods(opts.methods, this) // 实例的方法
    this.opts = opts // 实例配置
    this.uid = this.getUid() // 组件唯一标识

    // 获取 mountPoint
    {
      const mountPoint = this.opts?.mountPoint
      if (mountPoint != null) {
        this.mountPoint = document.querySelector(mountPoint)
      }
    }

    // 渲染相关
    this.lastVNode = null // 上一次的 VNode
    this.render = () => {
      const passToRender = {
        data: this.data,
        methods: this.methods,
      }
      const resultVNode = this.opts?.render?.(passToRender, this)
      // 返回undefined，将会创建一个默认的空的div
      if (resultVNode === undefined) return createDefaultVNode()
      // 返回null，将会删除这个dom元素
      if (resultVNode === null) return createEmptyVNode()
      return resultVNode
    }
    this.rednerWatcher = null

    // 组件依赖关系相关
    this.children = [] // 全体子组件实例
    this.namedChildren = new Map() // 命名的子组件实例，命名通过 name 属性
    this.parent = null // 父组件实例

    // 响应式
    observe(this.data, this)

    // 代理数据
    this.proxyData(this.data)

    // 初始化首次渲染，只有存在 mountPoint 才是首次渲染
    if (this.mountPoint) {
      this.mount()
    }
  }
  update() {
    const { render } = this
    if (this.lastVNode === null) {
      // 第一次渲染
      this.lastVNode = this.mountPoint || document.createElement('div')
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
