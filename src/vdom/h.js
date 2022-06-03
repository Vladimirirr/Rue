import { jsx } from 'snabbdom'

// 拦截snabbdom的h操作，以加入自定义特性
const h = (tag, data, children) => {
  // 这里要支持 className 和 style 的字符串写法，因为 snabbdom 本身不支持，只支持对象的写法
  // TODO: 等其他功能
  if (typeof tag === 'string'){
    return jsx(tag, data, children)
  }
  if (typeof tag === 'object'){
    // 从它的父组件的子组件池拿到对应的组件声明
    const componentInstance = tag
    // 手动悬空挂载组件实例
    componentInstance.mount()


  }
}

export { h }
