// 每个组件的多次更新合并为一个，且在本次事件循环的微任务时期执行

import schedulerEngine from './getSchedulerEngine.js'

// 当前事件循环周期内排队的组件 updater
// 虽然 Set 集合能自动去重，但是新加入相同的 updater 需要排在最后
const queueUpdaters = []

// 正在执行更新队伍
var isBeginUpdatersCalled = false

// 队伍是否已经被激活
var isUpdatersActivated = false

/**
 * 向更新队伍插入新的更新
 * @param {object} updater 组件的更新方法
 * @param {boolean} first 优先级，将通过 unshift 插入而不是 push
 */
const addUpdater = (updater, first) => {
  const foundIndex = queueUpdaters.findIndex((i) => i.uid === updater.uid)
  if (~foundIndex) {
    // 存在，把原来的移除
    queueUpdaters.splice(foundIndex, 1)
  }
  // push
  const whichAdd = first ? [].unshift : [].push
  whichAdd.call(queueUpdaters, updater)
  // 一旦是一个新的队伍，就激活此队伍
  if (!isUpdatersActivated) {
    isUpdatersActivated = true
    beginUpdaters()
  }
}

const clearUpdaters = () => {
  if (isBeginUpdatersCalled) {
    console.warn('can NOT clear updaters when updating is processing.')
    return
  }
  !isBeginUpdatersCalled && (queueUpdaters.length = 0)
}

const resetUpdatersStatus = () => (
  (isBeginUpdatersCalled = false), (isUpdatersActivated = false)
)

const beginUpdaters = () => {
  if (isBeginUpdatersCalled) {
    console.warn('can NOT begin updaters when another is began.')
    return
  }
  isBeginUpdatersCalled = true
  schedulerEngine(() => {
    // console.log('scheduler these updaters begin', queueUpdaters.map(i => i.uid))
    queueUpdaters.forEach((i) => i())
  })
  schedulerEngine(() => (resetUpdatersStatus(), clearUpdaters()))
}

window.queueUpdaters = queueUpdaters // for debug on console

// 对外暴露
export { addUpdater }
