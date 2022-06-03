// VNode相关的操作

import { h } from 'snabbdom'

export const createEmptyVNode = (comment) => h('!', null, comment) // 注释节点

export const createDefaultVNode = () => h('div') // 默认节点，空的 div
