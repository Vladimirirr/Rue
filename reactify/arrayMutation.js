var arrayMethods = [
  // 为了能使数组响应式而需要变异的数组方法
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'sort',
  'reverse',
]
var arrayMutation = {} // 导出的具有变异方法的数组原型

arrayMethods.forEach((fnName) => {
  var origin = [][fnName] // 原始数组方法
  arrayMutation[fnName] = function () {
    var args = [].slice.call(arguments)
    var res = origin.apply(this, args)
    var ob = this.__ob__
    var inserted // 新插入的元素集合
    switch (fnName) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 对inserted进行响应式
    ob.walkArray(inserted)
    // 触发更新
    ob.dep.notify()
    return res
  }
})

for (let x in arrayMutation) {
  Object.defineProperty(arrayMutation, x, {
    enumerable: false,
  })
}

arrayMutation.__proto__ = [].__proto__

export { arrayMutation }
