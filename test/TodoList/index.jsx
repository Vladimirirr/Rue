import { h } from '@/vdom/h.js'

const React = {
  // 模拟 React.createElement
  createElement: h,
}

const render = (opts) => {
  const lists = opts.data?.lists || []
  return (
    <div className="todoListContainer">
      <div>
        <input type="text" placeholder="add a new TODO"/>
        <button>add</button>
      </div>
      <ol>
        {lists.map((i) => (
          <li key={i.key}>{i.value}</li>
        ))}
      </ol>
    </div>
  )
}

const TodoList = { // 类似于 Vue2.x 的选项式 API
  data: {
    lists: [],
  },
  render,
}
window.TodoList = TodoList // for debug on console

export default TodoList
