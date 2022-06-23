import css from './index.module.css'

const render = (opts, vm) => {
  return (
    <span className={css.todoListItemContainer}>
      <span>title</span>
      <span>operations</span>
    </span>
  )
}

const TodoListItem = {
  render,
}

export default TodoListItem
