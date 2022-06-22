import Rue from '@/index.js'

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
  // 手动挂载组件
  componentInstance.mount()
  // 返回实例
  return componentInstance
}

export default buildComponent
