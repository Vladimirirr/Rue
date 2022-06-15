import { createEmptyVNode, createDefaultVNode } from '@/utils/vnode.js'

export default function installRender() {
  this.lastVNode = null // 上一次的 VNode
  this.renderWatcher = null // 组件的 render watcher
  this._render = () => {
    // 生成传给子组件的数据
    const passToRender = {
      data: this.data,
      methods: this.methods,
    }
    const resultVNode = this.opts?.render?.(passToRender, this)
    // 返回undefined，将会创建一个默认的空的div
    if (resultVNode === undefined) return createDefaultVNode()
    // 返回null，将会返回一个注释节点以实现删除此dom元素
    if (resultVNode === null) return createEmptyVNode()
    return resultVNode
  }
}
