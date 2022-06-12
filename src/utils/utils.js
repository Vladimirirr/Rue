import _ from '../lib/underscore.1.13.2.esm.js'

/**
 * 链式读取一个对象，使用underscore，它能处理很多错误值
 * 如果传入 _.get 的 keyPath 是一个空数组，返回默认值
 */
export const chainGet = (data, keyPath, defaultValue = void 0) =>
  _.get(data, keyPath.split('.'), defaultValue)

/**
 * 链式赋值一个对象
 */
export const chainSet = (data, keyPath, value) => {
  const keyPathArray = keyPath.split('.')
  const targetKey = keyPathArray.pop()
  var targetValue = null
  if (keyPathArray.length > 0) {
    targetValue = _.get(data, keyPathArray, null)
  } else {
    targetValue = data
  }
  return targetValue ? (targetValue[targetKey] = value) : void 0
}

/**
 * 返回一个能够读取对象特定路径的函数
 */
export function parsePath(path) {
  return function (val) {
    return chainGet(val, path)
  }
}

/**
 * 深拷贝一个对象，不要传入循环引用
 */
export function deepClone(source){
  const toString = Object.prototype.toString
  const result = Array.isArray(source) ? [] : {}
  Object.keys(source).forEach((key) => {
    const targetKeyValue = source[key]
    if (typeof targetKeyValue === 'object'){
      const type = toString.call(targetKeyValue)
      // 只深拷贝 基本对象 和 数组
      if (type === '[object Object]' || type === '[object Array]'){
        result[key] = deepClone(targetKeyValue)
        return
      }
    }
    result[key] = targetKeyValue
  })
  return result
}

export function setValueWithReactive(target, key, value) {
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

export function deleteValueWithReactive(target, key) {
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
