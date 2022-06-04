import { jsx } from 'snabbdom' // snabbdom 有原生的 h，而 jsx 是对标准 JSX 格式的 h 高层封装
import { buildComponentFromVNode } from './buildComponentFromVNode.js' // 创造子组件
import { resolveData } from '@/utils/vnode.js'

// 再对原生的 jsx 封装，以加入自定义特性
const h = (tag, data, ...children) => {
  // 这里要支持 className 和 style 的字符串写法，因为 snabbdom 本身不支持，只支持对象的写法
  // TODO 其他功能
  if (typeof tag === 'string') {
    const dataResolved = resolveData(tag, data)
    return jsx(tag, dataResolved, ...children)
  }
  if (typeof tag === 'object') {
    return buildComponentFromVNode(tag, data, children)
  }
}

export { h }
