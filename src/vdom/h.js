import { jsx } from 'snabbdom' // snabbdom 有原生的 h，而 jsx 是对标准 JSX 格式的 h 高层封装
import { resolveData } from '@/utils/vnode.js'
import { isVNode } from '@/constants/vnode.js'
import getVNodeFromComponent from './getVNodeFromComponent.js' // 创造子组件

// 标识此对象是一个VNode结构
const identifyVNode = (VNode) => ((VNode[isVNode] = true), VNode)

// 再对原生的 jsx 封装，以加入自定义特性
const h = (tag, data, ...children) => {
  if (typeof tag === 'string') {
    // 把传入的 VNode 参数解析成 snabbdom 可以识别的格式
    const dataResolved = resolveData(tag, data)
    return identifyVNode(jsx(tag, dataResolved, ...children))
  }
  if (typeof tag === 'object') {
    return identifyVNode(getVNodeFromComponent(tag, data, children))
  }
}

export { h }
