import Rue from '@/index.js'
import { h } from './h.js'

export const buildComponentFromVNode = (componentOptions, data, children) => {
  // 根据传入的配置项实例化一个组件
  const componentInstance = new Rue(componentOptions)
  const componentName = data?.name
  const componentParent = data?.parent
  {
    // 组件的 父 -> 子 依赖关系构建
    componentParent.children.push(componentInstance)
    if (componentName)
      componentParent.childrenNamed.set(componentName, componentInstance)
  }
  {
    // 组件的 子 -> 父 依赖关系构建
    componentInstance.parent = componentParent
  }
  // 渲染组件
  componentInstance.mount() // 手动挂载
  const { uid: c_uid, name: c_name } = componentInstance
  {
    // 安装 snabbdom 钩子
    data.hook = {
      init: function (vnode) {
        // 在此 VNode 被创建，且在 snabbdom 对它进行任何处理前调用
        // 在此可以对 VNode 进行审查和修改
        console.log('init')
      },
      prepatch: function (oldVnode, vnode) {
        // 元素即将被 patch
        // patch 的过程就是：snabbdom 对着最新的 VNode 来修改旧的 VNode，最终把旧的 VNode 变成新的 VNode，在更新旧 VNode 的同时也更新了 VNode 对应的 dom 元素
        console.log('prepatch')
      },
      insert: function (vnode) {
        // 新的 VNode 已经被插入到 dom
        // callback the mounted lifecycle
        console.log('insert')
      },
      remove: function (vnode, callback) {
        
      },
    }
  }
  return h(`rue-component-${c_uid}-${c_name || 'unknown'}`, data, ...children)
}
