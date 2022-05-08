import updaterElementFunctions from './domOpers.js'
import { chainGet, chainSet } from '../../utils/utils.js'
import { Watcher } from '../../reactify/Watcher.js'

const compileElementFunctions = {
  // 指令方法集
  text(node, exp, vm) {
    // 还需要增加传入的值是表达式的情况，而非路径
    const { text } = updaterElementFunctions
    text(node, exp, vm)
    new Watcher(vm.$data, exp, () => text(node, exp, vm))
  },
  html(node, exp, vm) {
    const { html } = updaterElementFunctions
    html(node, exp, vm)
    new Watcher(vm.$data, exp, () => html(node, exp, vm))
  },
  model(node, exp, vm) {
    const { model } = updaterElementFunctions
    model(node, exp, vm)
    // 目前model指令只对具有input事件的input元素
    // view -> model
    node.addEventListener('input', () => {
      chainSet(vm.$data, exp, node.value)
    })
    // model -> view
    new Watcher(vm.$data, exp, () => model(node, exp, vm))
  },
  on(node, exp, vm) {
    const { on } = updaterElementFunctions
    on(node, exp, vm)
  },
}

export default compileElementFunctions
