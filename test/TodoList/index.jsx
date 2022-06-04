import { h } from '@/vdom/h.js'

const React = {
  // 模拟 React.createElement
  createElement: h,
}

const render = (opts) => {
  const lists = opts.data?.lists || []
  const inputValue = opts.data?.inputValue || ''
  const changeInputValue = opts.methods?.changeInputValue || new Function()
  const addNew = opts.methods?.addNew || new Function()
  return (
    <div className="todoListContainer" style="margin-top: 20px;">
      <div>
        <input
          type="text"
          placeholder="add a new TODO"
          value={inputValue}
          onChange={changeInputValue}
        />
        <button onClick={addNew}>add</button>
      </div>
      <ol>
        {lists.map((i) => (
          <li key={i.key}>{i.value}</li>
        ))}
      </ol>
    </div>
  )
}

const TodoList = {
  // 类似于 Vue2.x 的选项式 API
  data: {
    lists: [],
    inputValue: '',
  },
  methods: {
    changeInputValue(e) {
      this.inputValue = e.target.value
    },
    addNew() {
      this.lists.push({
        key: Math.random() + '',
        value: this.inputValue,
      })
    },
  },
  render,
}
window.TodoList = TodoList // for debug on console

export default TodoList
