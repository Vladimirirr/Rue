import { createEmptyVNode, createDefaultVNode } from '@/utils/vnode.js'

export default function installRender() {
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
}
