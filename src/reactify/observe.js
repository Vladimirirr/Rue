/**
 * 把传入的数据对象变成响应式对象
 */

import { Observer } from './Observer.js'

export function observe(value, vm) {
  if (!(value instanceof Object)) return
  // if (
  //   !(value instanceof Object) || // 非对象
  //   // 目前下面的判断有问题，因为组件的配置项 data 传入 Rue 被 cloneDeep 后丢失了属性描述符
  //   Object.isSealed(value) || // 用户不期望变响应式，对基本类型都返回true
  //   Object.isFrozen(value) // 同上
  // )
  //   return
  return new Observer(value, vm)
}
