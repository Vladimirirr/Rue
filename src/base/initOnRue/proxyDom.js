import { getAllElementsByNodeType, insertAfter } from '@/utils/dom.js'

export default function proxyDom() {
  const comments = getAllElementsByNodeType(this.el, 8)
  const places = comments
    .filter((e) => e.nodeValue.includes(this.uidPrefix))
    .map((e) => ({
      uid: e.nodeValue,
      el: e,
    }))
  places.forEach(({ uid, el }) => {
    const target = this.children.find((i) => i.uid === uid)?.el
    target && insertAfter(target, el)
  })
}
