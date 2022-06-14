## Snabbdom 基本原理

只是简单的描述一下 snabbdom 的基本原理，而不是细致的分析。

首次 patch 时 snabbdom 会对传入的 VNode 进行 createElm 操作，根据 VNode 生成对应的 dom 并且附加在 VNode 的 elm 属性上（每个子 VNode 都有自己的 elm），然后清空目标 dom 的全部内容再将此 elm 添加进去：

1. `patch(targetContainer: HTMLElement, VNode)` 首次 patch 传入目标 dom 和初始的 VNode
2. `createElm(VNode)` 对着 VNode 创建对应的 dom
3. `VNode.elm = document.createElement(VNode.tag)` 根据 VNode 的 tag 属性创建对应的 dom 元素
4. `fns.create.forEach((fn) => fn(emptyVNode, VNode))` 使用工具函数集 fns.create，以空 VNode 作为参照物，按照 VNode 来创建 VNode.elm 的属性（比如：attributes、className、style、eventListeners、等等，下同）
5. `VNode.children.forEach((subVNode) => VNode.elm.appendChild(createElm(subVNode)))` 递归它的全部子节点，调用 createElm 创建它们的 dom 元素
6. `return VNode` 最后返回创建完成的 VNode 元素

后续每次更新时都会传入 oldVNode 和 newVNode 到 patch：

1. `patch(oldVNode, newVNode)` 新旧 VNode 进行对比，将差异反应到 oldVNode.elm 这个 dom 元素上
2. `newVNode.elm = oldVNode.elm` 把当前待更新的 dom 赋值给 newVNode，接下来按照 newVNode 来对此 elm 进行更新
3. `patchVNode(oldVNode, newVNode)` 依次比较新旧 VNode 的各种属性，这个过程就叫做 patch
4. `fns.update.forEach((fn) => fn(oldVNode, newVNode))` 使用工具函数集 fns.update，按照新旧 VNode 的差异来更新 newVNode.elm 的属性
5. `patchChilren(oldVNode.children, newVNode.children)` 递归比较它们的子节点
6. `return VNode` 最后返回修改完成的 VNode 元素
