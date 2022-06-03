import { jsx } from 'snabbdom'

const React = {
  // 模拟 React.createElement
  createElement: jsx,
}

import Msg from './Msg.jsx'

export default (props) => {
  // test the jsx for snabbdom
  const name = props?.name || 'nat'
  const msgList = props?.msgList || []
  const MsgVNode = Msg({ msgList })
  const handler = () => (
    console.info('hello at ' + new Date().toLocaleString()),
    window?.updateComponent?.()
  )
  return (
    <div>
      <p>hello, my name is { name }</p>
      <div>
        {/* 事件的写法与 JSX 不同 */}
        <button on={{ click: handler }}>do something</button>
      </div>
      <div>{ MsgVNode }</div>
    </div>
  )
}
