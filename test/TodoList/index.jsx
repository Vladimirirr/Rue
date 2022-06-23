import css from './index.module.css'

const render = (opts, vm) => {
  console.log('TodoList render')
  const lists = opts.data?.lists || []
  const inputValue = opts.data?.inputValue || ''
  const changeInputValue = opts.methods?.changeInputValue || new Function()
  const addNew = opts.methods?.addNew || new Function()
  const removeItem = opts.methods?.removeItem || new Function()
  return (
    <div className={css.todoListContainer} style="margin-top: 20px;">
      <div className={css.betweenLine}>
        <input
          type="text"
          placeholder="add a new TODO"
          value={inputValue}
          onChange={changeInputValue}
        />
        <button onClick={addNew}>add</button>
      </div>
      <ol style="padding: 0;">
        {lists.map((i) => (
          <li
            parent={vm}
            key={i.key}
            value={i.value}
            className={css.betweenLine}
          >
            <span>{i.value}</span>
            <button onClick={() => removeItem(i.key)}>del</button>
          </li>
        ))}
        {/* exists a bug in loop the components like the Item in this way of composing components */}
      </ol>
    </div>
  )
}

const TodoList = {
  // 类似于 Vue2.x 的选项式 API
  name: 'TodoList',
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
        value: this.inputValue || 'empty todo',
      })
      this.inputValue = ''
    },
    removeItem(key) {
      const index = this.lists.findIndex((i) => i.key === key)
      this.lists.splice(index, 1)
    },
  },
  render,
}
window.TodoList = TodoList // for debug on console

export default TodoList
