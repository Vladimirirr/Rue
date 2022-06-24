// 通用工具方法

import {
  get as _get,
  set as _set,
  cloneDeep as _cloneDeep,
  mapValues as _mapValues,
  flattenDeep as _flattenDeep, // 拍扁成一维数组，返回新的数组
} from 'lodash'

/**
 * 链式读取一个对象
 */
export const chainGet = _get

/**
 * 链式赋值一个对象
 */
export const chainSet = _set

/**
 * 空操作
 */
export const noop = () => {}

/**
 * 返回一个能够读取对象特定路径的函数
 */
export const parsePath = (path) => (value) => chainGet(value, path)

/**
 * 深拷贝一个对象
 */
export const cloneDeep = _cloneDeep

/**
 * 批量对函数进行bind处理
 */
export const bindMethods = (methods, vm) =>
  _mapValues(methods, (method) => method.bind(vm))

/**
 * 有效数组
 */
export const isValidArray = (array) => {
  if (!Array.isArray(array)) return false
  if (array.length === 0) return false
  const flatten = _flattenDeep(array)
  return !flatten.every((i) => !!i === false) // 全部都是假值，返回 false
}

/**
 * 有效对象
 */
export const isValidObject = (object) => {
  if (Object.prototype.toString.call(object) !== '[Object object]') return false
  return !(Object.keys(object).every((i) => !!object[i]) === false) // 键值对的值都是假值，返回 false
}

/**
 * 响应式赋值一个对象的属性
 */
export const setValueWithReactive = (target, key, value) => {
  // 对于数组利用splice实现添加元素
  if (Array.isArray(target)) {
    // 如果splice索引超过数组长度会报错
    target.length = Math.max(target.length, key)
    target.splice(key, 1, value)
    return value
  }
  // 对于对象，如果该属性已经存在，直接赋值
  if (key in target) {
    target[key] = value
    return value
  }
  const ob = target.__ob__
  // 如果目标对象不是响应式对象，直接赋值
  if (!ob) {
    target[key] = value
    return value
  }
  // 响应式化
  defineReactive(target, key, value)
  // 触发更新
  ob.dep.notify()
  return value
}

/**
 * 响应式删除一个对象的属性
 */
export const deleteValueWithReactive = (target, key) => {
  // 对于数组用splice方法删除元素
  if (Array.isArray(target)) {
    target.splice(key, 1)
    return
  }
  const ob = target.__ob__
  // 如果对象没有该属性，直接返回
  if (!(key in target)) return
  delete target[key]
  // 如果不是响应式对象，则不需要触发更新
  if (!ob) return
  // 对于响应式对象，删除属性后要触发更新
  ob.dep.notify()
}
