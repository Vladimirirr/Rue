## 这是什么
本项目是一个模仿Vue1.x的项目

[<span style="text-decoration: underline;">查看：React和Vue的基本思想和原理</span>](/docs/React.vs.Vue.md)

此 `1.0.0` 版本只是很简单地实现了基于 DOM 模板的单一组件（意味着不支持子组件），主要展示了 **依赖收集** 和 **发布订阅** 在 Vue 中的基本工作方式，而且此版本没有考虑到去除重复收集的依赖

在 `2.0.0` 版本引入了 虚拟DOM 技术，从而便捷地实现了更多的特性：

1. diff算法（基于snabbdom改造）
2. 组件化
3. 插槽
4. JSX（代替Vue的template语法）
5. hooks（代替minix和HOC的前端组件逻辑复用技术）
6. 路由（基于hash）
7. 全局状态管理（基于redux改造）
8. 插件（扩展Rue框架自身的能力）

## 模块化方式
本项目没使用任何模块化打包工具（比如webpack或rollup），本项目只是学习目的，不打算发布于实际生产环境，所以没有使用打包工具，而是完全使用ES6模块化语法

## 其他技术博文
https://www.cnblogs.com/ryzz

