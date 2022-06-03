import { jsx } from 'snabbdom'

const React = {
  // 模拟 React.createElement
  createElement: jsx,
}

export default (props) => {
  const msgList = props?.msgList || []
  return (
    <div>
      <p>
        {msgList.length > 0
          ? `please look ${msgList.length} message${
              msgList.length === 1 ? '' : 's'
            }`
          : 'no message here'}
      </p>
      <ol>
        {msgList.map((i) => (
          <li key={i.key}>{i.value}</li>
        ))}
      </ol>
    </div>
  )
}
