import _ from '../lib/underscore.1.13.2.esm.js'

/**
 * 链式读取一个对象，使用underscore，它能处理很多错误值
 * 如果传入 _.get 的 keyPath 是一个空数组，返回默认值
 */
export const chainGet = (data, keyPath, defaultValue = void 0) => _.get(data, keyPath.split('.'), defaultValue)

/**
 * 链式赋值一个对象
 */
export const chainSet = (data, keyPath, value) => {
  const keyPathArray = keyPath.split('.')
  const targetKey = keyPathArray.pop()
  var targetValue = null
  if (keyPathArray.length > 0){
    targetValue = _.get(data, keyPathArray, null)
  }else{
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

export function setReactiveValue(target, prop, value) {
  // === Vue.set
  target[prop] = value
  target.__ob__.dep.notify()
}
