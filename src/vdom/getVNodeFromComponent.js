import initComponentOptions from './initComponentOptions.js'
import buildComponent from './buildComponent.js'
import getPlace from './getPlace.js'

// 返回自定义组件的 VNode
const getVNodeFromComponent = (tag, data, children) => {
  const parent = data?.parent
  if (!parent)
    throw new TypeError(
      `a parent must be passed to a child when creating a component at ${
        tag.name || 'unknown'
      }`
    )
  // 初始化 和 格式化 组件配置对象
  initComponentOptions(tag)
  const uid = tag.uid
  const found = parent.children.find((i) => i.uid === uid)
  // 是否已经存在
  if (found) {
    return getPlace(found)
  } else {
    // 获取组件实例
    const instance = buildComponent(tag, data, children)
    return getPlace(instance)
  }
}

export default getVNodeFromComponent
