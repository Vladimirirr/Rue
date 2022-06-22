import { createPlaceVNode } from '@/utils/vnode.js'

// 获取子组件在父组件标识的坑位
const getPlace = (componentInstance) => {
  const {
    placePrefix: c_placePrefix, // 坑位名称前缀
    uid: c_uid, // 组件uid
    name: c_name, // 组件名字
  } = componentInstance
  // 组件VNode的data
  const data = {}
  // snabbdom 钩子
  data.hook = {
    prepatch(oldVNode, newVNode) {
      // 当父节点比较组件节点时，比较新旧组件的props、children等是否改变了
      // 如果改变了，就更新此子组件
      console.log(`component prepatch on ${newVNode.data.componentInstance.name}`)
    },
  }
  // 引用实例
  data.componentInstance = componentInstance
  return createPlaceVNode(
    `${c_placePrefix}:${c_uid}:${c_name || 'unknown'}`,
    data
  )
}

export default getPlace
