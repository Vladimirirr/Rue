function getChainValue(chain, data) {
  return chain.split('.').reduce((acc, now) => {
    acc = acc[now]
    return acc
  }, data)
}

function setChainValue(chain, data, value) {
  var keys = chain.split('.')
  var target = keys.pop()
  return (keys.reduce((acc, now) => {
    acc = acc[now]
    return acc
  }, data)[target] = value)
}

function parsePath(path) {
  // 返回的函数能够适配按某种次序读取的任何对象
  return function (val) {
    return getChainValue(path, val)
  }
}

function setReactiveValue(target, prop, value) {
  // == Vue.set
  target[prop] = value
  target.__ob__.dep.notify()
}

export { getChainValue, setChainValue, parsePath, setReactiveValue }
