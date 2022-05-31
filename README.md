## 这是什么

本项目是一个模仿 Vue1.x 的项目

[<span style="text-decoration: underline;">查看：React 和 Vue2.x 的基本思想和原理</span>](/docs/React.vs.Vue.md)

此 `1.0.0` 版本只是很简单地实现了基于 dom 模板的单一组件（意味着不支持子组件），主要展示了 **依赖收集** 和 **发布订阅** 在 Vue 中的基本工作方式。

在 `2.0.0` 版本引入了 VNode 技术，从而便捷地实现了更多的特性：

1. diff 算法（Web 端：基于 snabbdom 改造）
2. 组件化
3. 插槽
4. JSX（代替 Vue 的 template 语法）
5. hooks（代替 minix 和 HOC 的前端组件逻辑复用技术）
6. 路由（Web 端：基于 hash）
7. 全局状态管理（基于 redux 改造）
8. 插件（扩展 Rue 框架自身的能力）

## 其他技术博文

https://www.cnblogs.com/ryzz
