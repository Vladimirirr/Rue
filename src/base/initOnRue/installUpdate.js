export default function installUpdate() {
  this._update = (isFirstUpdate) => {
    // 更新组件的方法
    if (isFirstUpdate) {
      // 第一次渲染
      // 要给snabbdom一个目标，比如空的div
      this.lastVNode = document.createElement('div')
    }
    const nowVNode = this._render() // 混入自 installRender
    this.patch(this.lastVNode, nowVNode) // 继承自 baseClass
    // 保持最新的VNode
    this.lastVNode = nowVNode
    {
      // 其实下面的代码执行一次就行了，因为都是同一个引用对象，不会改变的
      // 保持最新的el
      this.el = this.lastVNode.elm
      // dom 反向引用实例
      this.el[`${this.instancePrefix}:${this.uid}`] = this
    }
    // 挂载（首次渲染且存在挂载点时）
    if (isFirstUpdate && this.mountPoint) {
      this.mountPoint.appendChild(this.el)
    }
    // 首次挂载时要代理子组件
    if (isFirstUpdate) {
      this.proxyDom()
    }
  }
  this._update.uid = this.uid // 给 update 函数一个组件的 uid
}
