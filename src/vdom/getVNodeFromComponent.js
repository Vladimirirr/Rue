import Rue from '@/index.js'
import { createEmptyVNode } from '@/utils/vnode.js'

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
  const { placePrefix: c_placePrefix, uid: c_uid, name: c_name } = componentInstance
  data.hook = {
    prepatch(oldVNode){
      
    }
  }
  return createEmptyVNode(`${c_placePrefix}:${c_uid}:${c_name || 'unknown'}`)
}

export default () => {

}
