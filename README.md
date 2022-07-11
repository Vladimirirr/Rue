## 这是什么

本项目是一个混合了 Vue2.x + React 思想的前端框架

> 站在巨人的肩膀上，所以我们能看得更远

基本思想：

- 每个组件管理自己的状态和真实 dom
- 父组件将代理子组件的 dom，从而组成最终的组件树

参考 Vue2.x 的思想：

- 响应式化对象
- 组件级别的更新，即每个组件的 render watcher
- 异步的批量合并更新
- 选项式 API
- 可选的侦听器 watch，由于使用了 render 函数 + JSX 语法的组件编写方式，多数情况下不需要自定义 watch，直接在 render 函数内操作即可

参考 React 的思想：

- render 函数 和 JSX 模板语法
- 单向数据流

高级特性：

- hooks 而非 mixin 或 HOC 来复用组件逻辑 - pending
- portal - pending
- fragment - pending
- 插件机制 - pending
- SSR - pending

## 快速开始

1. 克隆本仓库 `git clone ...`
2. 安装依赖 `npm i`
3. 本地运行 `npm run dev` 就可以看见默认的 TODO List 案例

## 学习文档

1. [<span style="text-decoration: underline;">查看：React 和 Vue2.x 的基本思想</span>](/docs/React.vs.Vue/index.md)

2. [<span style="text-decoration: underline;">查看：Snabbdom 的基本思想</span>](/docs/Snabbdom基本思想/index.md)

3. [<span style="text-decoration: underline;">查看：Vue2 组件树构建的基本流程</span>](/docs/Vue2组件树构建的流程/index.md)

4. [<span style="text-decoration: underline;">查看：React 知识清单</span>](/docs/React知识清单/index.md)

5. [<span style="text-decoration: underline;">查看：Vue3 响应式基础</span>](/docs/Vue3响应式基础/index.md)

## 功能依赖清单

1. VNode 和 diff 算法：[snabbdom](https://github.com/snabbdom/snabbdom)
2. 工具方法与链式操作：[lodash](https://github.com/lodash/lodash)

## 我的技术博客

https://www.cnblogs.com/ryzz
