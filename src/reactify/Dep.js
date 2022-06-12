var uid = 0 // 唯一标识

export class Dep {
  constructor() {
    this.subs = [] // 订阅者，观察者
    this.id = uid++
  }
  depend() {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  addSub(sub){
    // 加入一个订阅者
    this.subs.push(sub)
  }
  notify(...args) {
    this.subs.forEach((watcher) => watcher.update(...args))
  }
}

// 也可以把 target 保存到 window
// 只要确保能被全局访问到就行
// Vue 把它保存到了Dep上，那么 target 的保存位置就与平台无关了，其他平台可能没有 window 对象
Dep.target = null // 当前默认target

var targetStack = [] // 保存历史target

export function pushTarget(newTarget) {
  targetStack.push(Dep.target) // 压入上一次的target
  Dep.target = newTarget // 设置新的当前target
}

export function popTarget() {
  Dep.target = targetStack.pop() // 恢复到上一次的target
}
