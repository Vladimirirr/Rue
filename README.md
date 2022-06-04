## 这是什么

本项目是一个混合了 Vue2.x + React 思想的前端框架

基本思想：

- 每个组件管理着自己的状态和对应的真实 dom
- 父组件将代理子组件的 dom

参考 Vue2.x 的思想：

- 响应式化对象
- 组件级别的更新，即每个组件的 render watcher
- 选项式 API
- 计算属性 computed
- 侦听器 watch
- 组件注册机制

参考 React 的思想：

- JSX 模板语法
- 使用 CSS-in-JavaScript
- 单向数据流
- render props

高级特性：

- hooks 而非 mixin 或 HOC 来复用组件逻辑 [ ]
- portal [ ]
- 插件机制 [ ]
- error boundary [ ]
- suspend [ ]
- SSR [ ]

[<span style="text-decoration: underline;">查看：我的总结 -- React 和 Vue2.x 的基本思想和原理</span>](/docs/React.vs.Vue.md)

## 快速开始

pending

## 教程

pending

## 功能依赖清单

1. VNode 和 diff 算法：基于 [snabbdom](https://github.com/snabbdom/snabbdom)
2. 全局状态管理：基于 [redux](https://github.com/reduxjs/redux)

## 我的技术博客

https://www.cnblogs.com/ryzz
