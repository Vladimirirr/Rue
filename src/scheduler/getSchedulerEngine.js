// 浏览器需要支持 queueMicrotask API: https://caniuse.com/?search=queueMicrotask
// Chrome >= 71 2018.12
// Firefox >= 70 2019.9
// Safari >= 13 2019.10
// Chrome & Firefox for Android >= 101 2022.4

const getSchedulerEngine = () => {
  if (window.queueMicrotask) {
    return window.queueMicrotask
  } else {
    // 直接使用 setTimeout，也不使用其他微任务 polyfill 版本了
    return (cb) => setTimeout(cb)
  }
}

const schedulerEngine = getSchedulerEngine()

export default schedulerEngine
