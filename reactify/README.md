## 重点
- 用到数据的地方就是依赖，在getter中收集依赖，在setter中触发依赖
- 依赖就是具体值的路径（字符串），比如`'data.addr.door'`，而watcher订阅的就是此路径（依赖）
- Dep用来收集和管理依赖的订阅者
- 数据变化时（依赖变化时），对应依赖的setter就通知它的dep，让dep激活它管理的全部watcher，以实现特定的功能（比如更新组件）
- 收集依赖收集的就是watcher，触发依赖触发的也是watcher
- watcher把自己放到全局的某个位置，比如Dep.target，以便被收集
- 只有watcher触发的对应依赖的getter才会进行依赖收集（即把watcher自己收集起来）

## 响应式化的基本流程
observe（响应式化入口） -> Observer（遍历对象） -> defineReactive（定义劫持） -> observe（间接递归） ...

## 其他
这里实现的响应式更新是Vue1.x的方法，以节点为单位进行更新，在渲染模板时遇到插值表达式或指令就会实例化对应的watcher，这是一种细粒度的更新，而Vue2.x以组件为单位进行更新，传入watcher的不再是表达式字符串而是组件对应的渲染函数，这是一种中粒度的更新。

