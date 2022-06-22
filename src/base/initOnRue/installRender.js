import { createEmptyVNode } from '@/utils/vnode.js'
import { h } from '@/vdom/h.js'
import { isVNode } from '@/constants/vnode.js'

export default function installRender() {
  this.lastVNode = null // 上一次的 VNode
  this.renderWatcher = null // 组件的 render watcher
  this._render = () => {
    // 生成传给子组件的数据
    const passToRender = {
      data: this.data,
      methods: this.methods,
    }
    const resultVNode = this.opts?.render?.call(this, passToRender, this)
    // 返回null、undefined和false，将返回一个注释节点以实现删除此dom元素
    if (resultVNode == null || resultVNode === false) return createEmptyVNode()
    if (resultVNode[isVNode]) {
      // 合法的VNode
      return resultVNode
    } else {
      // 其他类型都强制类型转换成字符串
      return h('span', {}, resultVNode + '')
    }
  }
}
