import { chainGet, chainSet } from '../utils/utils.js'
import { Watcher } from '../reactify/index.js'

import compileElementFunctions from './utils/dirOpers.js'

export function compile(el, vm) {
  const fragment = node2Fragment(el)
  compile(fragment)
  el.append(fragment)

  function node2Fragment(node) {
    const fragment = document.createDocumentFragment()
    var nowNode
    while ((nowNode = node.firstChild)) {
      fragment.append(nowNode)
    }
    return fragment
  }
  function compile(node) {
    var childNodes = node.childNodes
    childNodes.forEach((item) => {
      if (item.nodeType === 3) {
        // 文本节点
        // console.log('文本', item);
        compileText(item)
      } else if (item.nodeType === 1) {
        // 元素节点
        // console.log('元素', item);
        compileElement(item)
        compile(item)
      }
    })
  }
  function compileText(node) {
    const data = vm.$data
    const originExp = node.textContent
    const mustacheReg = /\{\{(.+?)\}\}/g
    node.textContent = originExp.replace(mustacheReg, function () {
      var exp = arguments[1]
      new Watcher(data, exp, () => {
        node.textContent = originExp.replace(mustacheReg, function () {
          const exp = arguments[1]
          return chainGet(data, exp)
        })
      })
      return chainGet(data, exp)
    })
  }
  function compileElement(node) {
    const directives = ['text', 'html', 'model', 'on'] // 支持的指令
    const node_directives = [] // 节点带有的指令
    for (const x of node.attributes) {
      if (x.name.startsWith('r-')) {
        const directiveName = x.name.slice(2)
        if (directives.includes(directiveName)) {
          node_directives.push({
            name: directiveName,
            value: x.value,
          })
        }
      }
    }
    node_directives.forEach((directive) => {
      // 处理指令
      compileElementFunctions[directive.name](node, directive.value, vm)
      // // 删除指令
      // node.removeAttribute('y-' + directive.name)
    })
  }
}
