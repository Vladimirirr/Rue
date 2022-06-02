import { jsx } from 'snabbdom'

const React = {
  // 模拟 React.createElement
  createElement: jsx,
}

export default (opts) => {
  const { data, methods } = opts
  const { greeting } = data
  const { changeGreeting } = methods
  return (
    <div className="homeClass">
      <p>{ greeting }, it works.</p>
      <div>
        <button on={{ click: changeGreeting }}>change a greeting</button>
      </div>
    </div>
  )
}
