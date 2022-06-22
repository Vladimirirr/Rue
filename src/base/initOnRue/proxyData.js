export default function proxyData() {
  // 把 data 的数据代理到实例本身上，和 Vue 一样
  const data = this.data
  for (const x in data) {
    Object.defineProperty(this, x, {
      get() {
        return data[x]
      },
      set(newValue) {
        data[x] = newValue
      },
    })
  }
}
