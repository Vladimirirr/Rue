# React 知识清单（只记录难的知识点）

> 环境：React 18

## 生命周期钩子

前言：由于 React 在 16.4 版本引入了异步渲染，导致以前的`componentWillMount`、`componentWillReceiveProps`和`componentWillUpdate`钩子不再稳定。

1. `getDerivedStateFromProps(newProps, oldState) => newState: Object`: 此钩子存在的目的是为了在 props 变化时，根据最新的 props 得到（派生出）对应的 state，此钩子在业务代码中几乎用不到
2. `getSnapshotBeforeUpdate(oldProps, oldState) => snapshot: any`: 此钩子在 React 把当前最新的视图提交到 dom 前被调用，以获取上一次渲染的 dom 的一些信息，此钩子的任何返回值将当作`componentDidUpdate`的第三个参数

React 16.4 生命周期流程图：
![alt theLifecycleOfReact16.4](./imgs/the%20lifecycle%20of%20react%20whose%20version%20ge%2016.4.jpg)

## React with Redux

## React 18 与并发相关的底层 API
