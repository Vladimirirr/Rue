## 这是什么

本项目是一个混合了 Vue2.x + React 思想的前端框架

> 站在巨人的肩膀上，所以我们能看得更远

基本思想：

- 每个组件管理着自己的状态和对应的真实 dom
- 父组件将代理子组件的 dom

参考 Vue2.x 的思想：

- 响应式化对象
- 组件级别的更新，即每个组件的 render watcher，异步的批量合并更新
- 选项式 API
- 侦听器 watch

参考 React 的思想：

- JSX 模板语法
- 使用 CSS-in-JavaScript
- 单向数据流
- render 函数

高级特性：

- hooks 而非 mixin 或 HOC 来复用组件逻辑 - pending
- portal - pending
- 插件机制 - pending
- error boundary - pending
- suspend - pending
- SSR - pending

## 快速开始

1. 克隆本仓库 `git clone ...`
2. 安装依赖 `npm i`
3. 本地运行 `npm run dev` 就可以看见默认的 TODO List 案例

## 教程

pending

## 学习文档

[<span style="text-decoration: underline;">查看：我的总结 -- React 和 Vue2.x 的基本思想和原理</span>](/docs/React.vs.Vue.md)

[<span style="text-decoration: underline;">查看：我的总结 -- Snabbdom 的基本思想</span>](/docs/Snabbdom基本思想.md)

## 功能依赖清单

1. VNode 和 diff 算法：基于 [snabbdom](https://github.com/snabbdom/snabbdom)
2. 全局状态管理：基于 [redux](https://github.com/reduxjs/redux)

## 我的技术博客

https://www.cnblogs.com/ryzz
