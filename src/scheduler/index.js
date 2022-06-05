// 每个组件的多次更新合并为一个，且在本次事件循环的微任务时期执行

import schedulerEngine from './getSchedulerEngine.js'

// 当前事件循环周期内排队的组件 updater
// 虽然 Set 集合能自动去重，但是新加入相同的 updater 需要排在最后
const queueUpdaters = []

// 正在执行更新队伍
var isUpdating = false

// 队伍是否已经被激活
var isUpdatersActivated = false

/**
 * 向更新队伍插入新的更新
 * @param {object} rednerWatcher 渲染 watcher
 * @param {boolean} first 优先级，将通过 unshift 插入而不是 push
 */
const addUpdater = (rednerWatcher, first) => {
  if (isUpdating) {
    console.warn('do NOT add updater when updating is processing.')
    return
  }
  const foundIndex = queueUpdaters.indexOf(rednerWatcher)
  if (~foundIndex) {
    // 存在，把原来的移除
    queueUpdaters.splice(foundIndex, 1)
  }
  // push
  const whichAdd = first ? [].unshift : [].push
  whichAdd.call(queueUpdaters, rednerWatcher)
  // 一旦是一个新的队伍，就激活此队伍
  if (!isUpdatersActivated) {
    isUpdatersActivated = true
    beginUpdaters()
  }
}

const clearUpdaters = () => {
  if (isUpdating) {
    console.warn('can NOT clear updaters when updating is processing.')
    return
  }
  !isUpdating && queueUpdaters.length === 0
}

const resetUpdatersStatus = () => (
  (isUpdating = false), (isUpdatersActivated = false)
)

const beginUpdaters = () => {
  if (isUpdating) {
    console.warn('can NOT begin updaters when another is processing.')
    return
  }
  isUpdating = true
  schedulerEngine(() => queueUpdaters.forEach((i) => i()))
  schedulerEngine(() => (clearUpdaters(), resetUpdatersStatus()))
}

window.queueUpdaters = queueUpdaters // for debug on console

// 对外暴露
export { addUpdater }
