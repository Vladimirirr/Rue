import { getAllElementsByNodeType, insertAfter } from '@/utils/dom.js'

export default function installProxyDom() {
  const proxyDom = function () {
    // 把父组件带有子组件坑位的标识符填充为子组件的 dom，即代理了子组件的 dom
    // 坑位用注释节点表示
    const comments = getAllElementsByNodeType(this.el, 8) // 找到全部的注释节点
    if (comments.length === 0) return
    // 得到坑位标识的组件 uid
    const getUidFromPlace = (v) => v.trim().split(':')[1]
    // 选出坑位注释节点
    const places = comments
      .filter((e) => e.nodeValue.includes(this.placePrefix))
      .map((e) => ({
        uid: getUidFromPlace(e.nodeValue), // 坑位代表的组件的uid
        placeEl: e, // 坑位dom
      }))
    // 进行代理，把坑位替换成对应的组件的el
    places.forEach(({ uid, placeEl }) => {
      // 坑位的uid是字符串，而组件的uid是数字，此处使用宽松比较，而非严格比较
      const target = this.children.find((i) => i.uid == uid)?.el // 找到对应的组件
      target && insertAfter(target, placeEl)
    })
  }
  this.proxyDom = proxyDom
}
