import Rue from '@/index.js'
import { h } from './h.js'

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
  const { uid: c_uid, name: c_name } = componentInstance
  return h(`rue-component-${c_uid}-${c_name || 'unknown'}`, data, ...children)
}
