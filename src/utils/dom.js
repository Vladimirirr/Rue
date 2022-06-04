// 原生 dom 操作的工具方法

/**
 * 得到 nodeType 的全部元素
 */
export const getAllElementsByNodeType = (container, nodeType) => {
  const result = []
  container.childNodes.forEach(el => {
    if (el.childNodes.length > 0){
      return result.push(...getAllElementsByNodeType(el, nodeType))
    }
    if (el.nodeType === nodeType) result.push(el)
  })
  return result
}

/**
 * 插入到一个元素同级的后面，是原生 insertBefore 的相反方向的操作
 */
export const insertAfter = (target, where) => {
  // 把 target 插入到 where 同级的后面
  const parent = where.parentElement
  if (parent.lastChild === where){
    parent.appendChild(target)
  }else{
    // insertBefore(nodeToInsert, insertNodeBeforeThisNode)
    parent.insertBefore(target, target.nextSibling)
  }
}
