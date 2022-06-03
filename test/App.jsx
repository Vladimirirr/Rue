import Rue from '@/index.js'
import { h } from '@/vdom/h.js'

import TodoList from './TodoList/index.jsx' // 导入子组件

const React = {
  // 模拟 React.createElement
  createElement: h,
}

const render = (opts, vm) => {
  // TODO 定制注入的 h 函数，对自定义组件自动传入 parent 属性
  const isRoot = opts.data?.isRoot
  return (
    <div className="container">
      {isRoot && <p>Welcome to Rue!</p>}
      <div>
        <div>ToDoListHere</div>
        {/* 目前，对自定义组件要手写 parent 属性 */}
        {/* 此子组件需要它的父组件帮它插入它的 dom，即代理它的 dom */}
        <TodoList parent={vm} />
      </div>
    </div>
  )
}

const App = new Rue({
  mountPoint: '#app', // 传入一个合法且存在的选择器当作挂载点，此元素将**被替换**
  data: {
    // 此部分将被深拷贝
    isRoot: true,
  },
  render, // 组件模板，JSX格式
  // lifecycle: {
  //   created(){
  //     // 初始化完成，数据以及响应式化，即将进行 dom 挂载
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
})
window.App = App // for debug on console

export default App
