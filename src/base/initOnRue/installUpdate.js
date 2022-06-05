export default function installUpdate() {
  this._update = (isFirstUpdate) => {
    // 更新组件的方法
    if (isFirstUpdate) {
      // 第一次渲染
      this.lastVNode = document.createElement('div')
    }
    const nowVNode = this._render()
    this.patch(this.lastVNode, nowVNode)
    this.lastVNode = nowVNode
    // 每次更新都保持组件自身的el最新，不要更新 VNode.elm 否则导致下次 patch 会出错
    this.el = this.lastVNode.elm
    // 代理子组件的 dom
    this.proxyDom()
    // 挂载
    if (isFirstUpdate && this.mountPoint) {
      this.mountPoint.appendChild(this.el)
    }
  }
  this._update.uid = this.uid
}
