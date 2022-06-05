import { h } from '@/vdom/h.js'

import css from './index.module.css'

const React = {
  // 模拟 React.createElement
  createElement: h,
}

const render = (opts, vm) => {
  const title = opts.data?.title || 'a empty todo'
  return (
    <span className={css.todoListItemContainer}>
      <span>{title}</span>
      <span>
        <button className={css.delBtn}>删除</button>
      </span>
    </span>
  )
}

const TodoListItem = {
  render,
}

export default TodoListItem
