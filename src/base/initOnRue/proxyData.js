export default function proxyData() {
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
