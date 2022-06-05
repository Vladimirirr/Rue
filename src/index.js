// 基类
import baseClass from './base/baseClass.js'

// vnode
import { createEmptyVNode, createDefaultVNode } from './utils/vnode.js'

// dom
import { getAllElementsByNodeType, insertAfter } from './utils/dom.js'

// 其他
import { cloneDeep, bindMethods } from './utils/utils.js'

// 更新调度
import { addUpdater } from './scheduler/index.js'

// 响应式
import { observe, Watcher } from './reactify/index.js'

export default class Rue extends baseClass {
  constructor(opts) {
    super()
    // 配置项相关
    this.mountPoint = null // 挂载点，**此元素将被替换**
    this.el = null // 实例对应的 dom
    this.data = cloneDeep(opts.data || {}) // 实例的状态数据
    this.methods = bindMethods(opts.methods || {}, this) // 实例的方法，this绑定组件自身实例，而不是snabbdom默认的当前VNode
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
    this.rednerWatcher = null // 组件的 render watcher
    this._render = () => {
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

    // 更新相关
    this._update = (isFirstUpdate) => {
      // 更新组件的方法
      if (isFirstUpdate) {
        // 第一次渲染
        this.lastVNode = document.createElement('div')
      }
      const nowVNode = this._render()
      this.patch(this.lastVNode, nowVNode)
      this.lastVNode = nowVNode
      // 每次更新都保持组件自身的el最新，不要更新 VNode.elm 否则导致下次 patch 会出错
      this.el = this.lastVNode.elm
      // 代理子组件的 dom
      this.proxyDom()
      // 挂载
      if (isFirstUpdate && this.mountPoint){
        this.mountPoint.appendChild(this.el)
      }
    }
    this._update.uid = this.uid

    // 组件依赖关系相关
    this.children = [] // 全体子组件实例
    this.namedChildren = new Map() // 命名的子组件实例，命名通过 name 属性
    this.parent = null // 父组件实例

    // 响应式
    observe(this.data, this)

    // 代理数据
    this.proxyData()

    // 初始化首次渲染，只有存在 mountPoint 才是首次渲染
    if (this.mountPoint) {
      this.mount()
    }
  }
  update() {
    const isFirstUpdate = this.lastVNode === null
    // 首次渲染将被同步执行
    if (isFirstUpdate) {
      this._update(isFirstUpdate)
    } else {
      addUpdater(() => this._update(isFirstUpdate))
    }
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
  proxyData() {
    const data = this.data
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
  proxyDom() {
    const comments = getAllElementsByNodeType(this.el, 8)
    const places = comments
      .filter((e) => e.nodeValue.includes(this.uidPrefix))
      .map((e) => ({
        uid: e.nodeValue,
        el: e,
      }))
    places.forEach(({ uid, el }) => {
      const target = this.children.find((i) => i.uid === uid)?.el
      target && insertAfter(target, el)
    })
  }
}
