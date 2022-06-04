import Rue from '@/index.js'
import { createEmptyVNode } from '@/utils/vnode.js'

export const buildComponentFromVNode = (componentOptions) => {
  // 从它的父组件的子组件池拿到对应的组件配置项 并且 实例化它
  const componentInstance = new Rue(componentOptions)
  const componentName = data?.name
  const componentParent = data?.parent
  {
    // 父 -> 子 依赖关系构建
    componentParent.children.push(componentInstance)
    if (componentName)
      componentParent.childrenNamed.set(componentName, componentInstance)
  }
  {
    // 子 -> 父 依赖关系构建
    componentInstance.parent = componentParent
  }
  return createEmptyVNode(componentInstance.uid) // 在父组件对应的结构位置上标识此子组件
}
