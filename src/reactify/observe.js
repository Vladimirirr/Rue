/**
 * 把传入的数据对象变成响应式对象
 */

import { Observer } from './Observer.js'

export function observe(value, vm) {
  if (!(value instanceof Object)) return
  return new Observer(value, vm)
}
