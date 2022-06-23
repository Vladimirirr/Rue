import { h } from '@/vdom/h.js'

import TodoList from './TodoList/index.jsx' // 导入子组件

const React = {
  // 模拟 React.createElement
  createElement: h,
}

const render = (opts, vm) => {
  // TODO 定制注入的 h 函数，对自定义组件自动传入 parent 属性
  console.log('App render')
  const isRoot = opts.data?.isRoot
  return (
    <div className="container">
      {isRoot && <p>Welcome to Rue!</p>}
      <p>
        <button onClick={() => (opts.data.isRoot = !isRoot)}>
          {isRoot ? 'hide' : 'show'} welcome tip
        </button>
      </p>
      <div>
        {/* 一个 JSX 标记没有属性，那么对应的 snabbdom 的 h 的 data = null */}
        {/* 一个 JSX 标记没有子节点，那么对应的 snabbdom 的 h 的 children（在 snabbdom 的 h 或 jsx 里，children 是剩余参数） = [] */}
        <div>Here is a TodoList Demo</div>
        {/* 目前，对自定义组件要手写 parent 属性 */}
        {/* 此子组件需要它的父组件帮它插入它的 dom，即代理它的 dom */}
        <TodoList parent={vm} />
      </div>
    </div>
  )
}

const App = {
  name: 'App', // 组件名字，可选
  data: {
    // 此部分将被深拷贝
    isRoot: true,
  },
  render, // 组件模板，JSX格式
  // lifecycle: {
  //   created(){
  //     // 初始化完成，数据已经响应式化，即将进行 dom 挂载
  //     console.log('lifecycle: created')
  //   },
  //   mounted(){
  //     // 元素已经被挂载
  //     console.log('lifecycle: mounted')
  //   },
  //   updated(){
  //     // 元素已经被更新
  //     console.log('lifecycle: updated')
  //   },
  // },
}
window.App = App // for debug on console

export default App
