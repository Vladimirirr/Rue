import { chainGet, chainSet } from '../../utils/utils.js'

// 对外暴露的 dom 操作方法
const updaterElementFunctionsExternal = {
  // 指令具体的更新方法集
  text(node, exp, vm) {
    node.innerText = chainGet(vm.$data, exp)
  },
  html(node, exp, vm) {
    node.innerHTML = chainGet(vm.$data, exp)
  },
  model(node, exp, vm) {
    node.value = chainGet(vm.$data, exp)
  },
  on(node, exp, vm) {
    const [eventName, eventFn] = exp.split(':') // r-on="click:fn"
    node.addEventListener(eventName, vm.$methods[eventFn].bind(vm))
  },
}

// 只在内部使用的 dom 方法
const updaterElementFunctionsInternal = {}

export default {
  ...updaterElementFunctionsExternal,
  ...updaterElementFunctionsInternal,
}
