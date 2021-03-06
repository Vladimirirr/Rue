/**
 * 劫持数据对象的每个依赖，使它们响应式化
 */

import { Dep } from './Dep.js'
import { observe } from './observe.js'

function dependArray(arr) {
  for (const e of arr) {
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}

export function defineReactive(data, key, vm) {
  var dep = new Dep() // 每个值（依赖）都有自己的订阅列表
  var value = data[key]
  var childOb = observe(value, vm) // childOb => value.__ob__ => data[key].__ob__
  // 当value是对象时（包括数组），value闭包的dep和value.__ob__.dep保存的watchers是一样的，闭包中的dep保证了整个value被覆写时能够触发响应，而childOb保证了$set和$delete方法动态添加或删除value属性时能触发响应，以及value是数组时，数组的变异操作也能触发响应

  // 下面用于测试，查看此依赖的闭包的内容
  window['dep' + key] = {
    dep,
    value,
    childOb,
  }

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend()
      if (childOb) {
        childOb.dep.depend()
        // 依赖一个数组就是依赖它的全部子孙
        // 那么它的全部子孙也要有同样的根数组的watchers
        if (Array.isArray(value)) {
          dependArray(value)
        }
      }
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        value = newValue
        childOb = observe(newValue, vm)
        dep.notify()
        // updated
        // vm.$lifecycle?.updated.call(vm)
      }
    },
  })
}
