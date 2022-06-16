import { createPlaceVNode } from '@/utils/vnode.js'

// 获取子组件在父组件标识的坑位

const getPlace = ({
  placePrefix: c_placePrefix, // 坑位名称前缀
  uid: c_uid, // 组件 uid
  name: c_name, // 组件名字
  props: props, // 组件依赖父组件的数据
}) =>
  createPlaceVNode(`${c_placePrefix}:${c_uid}:${c_name || 'unknown'}`, props)

export default getPlace
