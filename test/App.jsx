import Rue from '@/index.js'
import { h } from '@/vdom/h.js'
import TodoList from './TodoList/index.jsx'

const React = {
  // 模拟 React.createElement
  createElement: h,
}

const render = (opts) => {
  const isRoot = opts.data?.isRoot
  return (
    <div className="container">
      { isRoot && <p>Welcome to Rue!</p> }
      <div>
        <TodoList />
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
  components: {
    'TodoList': TodoList,
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