import { chainGet, chainSet } from '../utils/utils.js'
import { Watcher } from '../reactify/index.js'

// 编译元素的方法
import compileElementFunctions from './utils/dirOpers.js'

// 克隆模板
function node2Fragment(node) {
  const fragment = document.createDocumentFragment()
  var nowNode
  while ((nowNode = node.firstChild)) {
    fragment.append(nowNode)
  }
  return fragment
}

// 编译文本节点
function compileText(node, vm) {
  const data = vm.$data
  const originExp = node.textContent // 写在文本节点的插值表达式(mustache)
  const mustacheReg = /\{\{(.+?)\}\}/g
  node.textContent = originExp.replace(mustacheReg, function () {
    var exp = arguments[1] // the first group same as $1
    // 对依赖的值创建watcher
    new Watcher(data, exp, () => {
      node.textContent = originExp.replace(mustacheReg, function () {
        const exp = arguments[1]
        return chainGet(data, exp)
      })
    })
    // 返回此节点的初始值
    return chainGet(data, exp)
  })
}

// 编译元素节点
function compileElement(node, vm) {
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
    // 删除原始指令标识
    // node.removeAttribute('y-' + directive.name)
  })
}
// 编译方法入口
export function compile(el, vm) {
  const fragment = node2Fragment(el)
  var childNodes = fragment.childNodes
  childNodes.forEach((item) => {
    if (item.nodeType === 3) {
      // 文本节点
      // console.log('文本', item);
      compileText(item, vm)
    } else if (item.nodeType === 1) {
      // 元素节点
      // console.log('元素', item);
      compileElement(item, vm)
      compile(item, vm)
    }
  })
  el.append(fragment)
}
