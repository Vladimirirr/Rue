import { h } from '@/vdom/h.js'

const React = {
  // 模拟 React.createElement
  createElement: h,
}

const render = (opts) => {
  const msg = opts.props?.msg || 'empty'
  const lists = opts.data?.lists || []
  return (
    <div className="todoListContainer">
      <p>{`message from parent instance: ${msg}`}</p>
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
