import Rue from '@/index.js'
import { jsx } from 'snabbdom' // snabbdom 有原生的 h，而 jsx 是对标准 JSX 格式的 h 高层封装

// 再对原生的 jsx 封装，以加入自定义特性
const h = (tag, data, children) => {
  // 这里要支持 className 和 style 的字符串写法，因为 snabbdom 本身不支持，只支持对象的写法
  // TODO 其他功能
  if (typeof tag === 'string') {
    return jsx(tag, data, children)
  }
  if (typeof tag === 'object') {
    // 从它的父组件的子组件池拿到对应的组件配置项 并且 实例化它
    const componentOptions = tag
    const componentInstance = new Rue(componentOptions)
    const componentName = data?.name
    const componentParent = data?.parent
    {
      // 父 -> 子
      componentParent.children.push(componentInstance)
      if (componentName) componentParent.childrenNamed.set(componentName, componentInstance)
    }
    {
      // 子 -> 父
      componentInstance.parent = componentParent
    }
  }
}

export { h }
