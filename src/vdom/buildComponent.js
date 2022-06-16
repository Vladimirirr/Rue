import Rue from '@/index.js'
import getPlace from './getPlace.js'

// 根据传入的配置项实例化一个组件
const buildComponent = (componentOptions, data, children) => {
  // TODO process children
  const componentInstance = new Rue(componentOptions)
  const componentName = data?.name
  const componentParent = data?.parent
  {
    // 组件的 父 -> 子 依赖关系构建
    componentParent.children.push(componentInstance)
    if (componentName)
      componentParent.childrenNamed.set(componentName, componentInstance)
  }
  {
    // 组件的 子 -> 父 依赖关系构建
    componentInstance.parent = componentParent
  }
  // 渲染组件
  componentInstance.mount() // 手动挂载
  // snabbdom 钩子
  data.hook = {
    prepatch(oldVNode, newVNode) {
      // 当父节点比较自定义节点时，对此自定义节点做更新
    },
  }
  // 返回坑位
  return getPlace(componentInstance)
}

export default buildComponent
