// 基类
import baseClass from './base/baseClass/index.js'

// 方法
import { cloneDeep, bindMethods } from './utils/utils.js'

// 更新调度
import { addUpdater } from './scheduler/index.js'

// 响应式
import { observe, Watcher } from './reactify/index.js'

// 初始化
import installRender from './base/initOnRue/installRender.js'
import installUpdate from './base/initOnRue/installUpdate.js'
import installDomProxyer from './base/initOnRue/installProxyDom.js'
import proxyData from './base/initOnRue/proxyData.js'

// 组件 uid
var uid = 0

export default class Rue extends baseClass {
  constructor(opts) {
    super()
    // 配置项初始化相关
    this.mountPoint = null // 挂载点，**此元素将被替换**
    this.el = null // 实例对应的 dom
    this.data = cloneDeep(opts.data || {}) // 实例的状态数据
    this.methods = bindMethods(opts.methods || {}, this) // 实例的方法，this绑定组件自身实例，而不是snabbdom默认的当前VNode
    this.uid = uid++ // 组件唯一标识
    this.opts = opts // 保存实例配置

    // 获取 mountPoint
    {
      const mountPoint = this.opts?.mountPoint
      if (mountPoint != null) {
        this.mountPoint = document.querySelector(mountPoint)
      }
    }

    // 渲染相关
    installRender.call(this)

    // 更新相关
    installUpdate.call(this)

    // 挂载子组件相关
    installDomProxyer.call(this)

    // 组件依赖关系相关
    this.children = [] // 全体子组件实例
    this.namedChildren = new Map() // 命名的子组件实例，命名通过 name 属性
    this.parent = null // 父组件实例

    // 响应式
    observe(this.data, this)

    // 代理数据
    proxyData.call(this)

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
      const updater = () => this._update(isFirstUpdate)
      updater.uid = this._update.uid
      addUpdater(updater)
    }
  }
  mount() {
    // 挂载组件
    // 执行 render 函数
    const { render, name } = this.opts
    if (!render) throw new Error(`no render specified for ${name || 'unknown'}`)
    const update = this.update.bind(this)
    // 创建组件重新渲染的 watcher
    this.renderWatcher = new Watcher(this.data, update, update, 1)
  }
  unmount() {
    // 卸载组件
  }
}
