import Rue from '@/index.js'
import { createEmptyVNode } from '@/utils/vnode.js'

export const buildComponentFromVNode = (componentOptions, data, children) => {
  // TODO 处理组件的children
  // 根据传入的配置项实例化一个组件
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
  return createEmptyVNode(componentInstance.uid) // 在父组件对应的结构位置上标识此子组件
}
