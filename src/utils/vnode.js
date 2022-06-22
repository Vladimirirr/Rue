// VNode相关的工具方法

import { h } from 'snabbdom'

export const createEmptyVNode = (comment = '') => h('!', null, `${comment}`) // 注释节点

export const createPlaceVNode = (comment, data) => h('!', data, `${comment}`) // 坑位节点

export const createDefaultVNode = () => h('div') // 默认节点，空的 div

/**
 * 处理 VNode 的 data
 */
export const resolveData = (tag, data) => {
  // TODO 使用管道流处理
  const result = {}
  // 特定元素
  if (tag === 'input') {
    result.props = {
      type: data.type,
      value: data.value,
      id: data.id,
      name: data.name,
      placeholder: data.placeholder,
    }
  }
  // 通用
  // 处理 className
  if (data?.className) {
    result.class = data.className
      .split(' ')
      .reduce((a, b) => ((a[b] = true), a), {})
  }
  // 处理 style
  if (data?.style) {
    const type = typeof data.style
    switch (type) {
      case 'object':
        result.style = data.style
        break
      case 'string':
        if (data.style.endsWith(';'))
          data.style = data.style.substring(0, data.style.length - 1)
        result.style = data.style
          .replace(/\s/g, '')
          .split(';')
          .reduce((a, b) => {
            const keyValue = b.split(':')
            const [key, value] = keyValue
            a[key] = value
            return a
          }, {})
        break
    }
  }
  // 处理事件
  Object.keys(data ?? {})
    .filter((i) => i.startsWith('on'))
    .forEach((i) => {
      const len = i.length
      const eventName = i.substring(2, len).toLowerCase()
      const eventHandler = data[i]
      if (result.on) {
        result.on[eventName] = eventHandler
      } else {
        result.on = {
          [eventName]: eventHandler,
        }
      }
    })
  return {
    ...data,
    ...result,
  }
}
