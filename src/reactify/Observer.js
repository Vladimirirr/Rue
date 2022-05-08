/**
 * 递归的遍历一个数据对象，使得它最终变成响应式对象
 */

import { defineReactive } from './defineReactive.js'
import { arrayMutation } from './arrayMutation.js'
import { observe } from './observe.js'
import { Dep } from './Dep.js'

export class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    Object.defineProperty(value, '__ob__', {
      // 把Observer实例放在对象身上
      enumerable: false,
      configurable: true,
      writable: true,
      value: this,
    })
    if (value instanceof Array) {
      // or Array.isArray(value)
      this.walkArray(value)
      value.__proto__ = arrayMutation
    } else {
      this.walk(value)
    }
  }
  walk(data) {
    Object.keys(data).forEach((i) => defineReactive(data, i))
  }
  walkArray(data) {
    data.forEach((i) => observe(i))
  }
}
