# React 和 Vue 的基本工作原理

## React 的基本工作原理

### 基本思想

基本思想：`view = render(state)`
渲染函数`render`根据当前状态`state`得出最新的视图`view`，在 React 中，得出的视图是 VNode 树结构。
最终，对应的渲染器将 VNode 树渲染到对应的平台上，对于 Web 平台，对应的渲染器就是 ReactDOM，对于移动平台而言则是 ReactNative。

### JSX 语法

React 认为，一个组件就是封装了`HTML`、`JavaScript`和`CSS`的对象，而组件的基本组成单元是 VNode，React 使用 JSX(JavaScript XML) 这个特定的 DSL 语言来描述 VNode：

```jsx
const name = 'nat'
const greeting = <p style={ color: 'red' }>hello {name}</p>
```

JSX 的本质是 JavaScript，上述的 JSX 经过编译得到如下的代码：

```javascript
const { createElement: h } = React
// 社区习惯性地将createElement（创建VNode的函数）简称为h函数
const name = 'nat'
const greeting = h(
  'p',
  {
    style: {
      color: 'red',
    },
  },
  `hello ${name}`
)
```

而有状态的 VNode 集合就是组件，如下：

```javascript
const { Component } = React
class ListItem extends Component {
  constructor(props) {
    super(props) // 子类必须调用父类构造
  }
  render() {
    const { title, content } = this.props
    return (
      <template>
        <p>
          {title}：{content}
        </p>
      </template>
    )
  }
}
class List extends Component {
  constructor(props) {
    super(props)
    this.state = {} // 创建组件的状态
    this.state.dataSource = []
    this.getDataSource = function (event) {
      fetch(Date.now()).then((result) =>
        this.setState({ dataSource: result?.data ?? [] })
      )
    }.bind(this) // 事件处理器必须要绑定组件的this，因为获取和更新状态都要从this着手，也可以使用箭头函数
  }
  render() {
    // 返回本组件的VNode
    return (
      <template>
        <h1>here are the lists</h1>
        <div>
          <button onClick={this.getDataSource}>click and get data</button>
        </div>
        {/* 由于JSX本质上就是调用h函数的JavaScript表达式，故而可以使用JavaScript表达式的全部特性 */}
        {this.state.dataSource.map(({ title, content }) => (
          <ListItem title={title} content={content} />
        ))}
      </template>
    )
  }
  onMount() {
    // 组件被挂载
    this.getDataSource(Date.now())
  }
}
```

上述这种使用**类**的方式描述组件很形象，组件维护着自己的状态，组件拥有改变状态的方法，组件通过 render 方法输出组件当前状态的视图，但是这个存在一些缺陷：

1. 面向类、对象的 OOP 编程思想强调的是 封装、继承、多态，而组件只是很纯粹的描述当前状态下的视图，根本用不到多层的继承，更用不到多态，仅仅用到了封装
2. JavaScript 归根到底是原型继承，ES6 的 class 也只是语法糖，JavaScript 更适合走函数式编程的风格
3. 在使用类的时候会经常用到 this 关键字，而 this 关键字在 JavaScript 很具有误导性，它与传统的 Java 的 this 截然不同
4. class 的内存开销过大
5. 使用 高阶组件 HOC 或 混入 的方式来复用组件的公共逻辑是很糟糕的设计体验
6. ...

所以从 React 16.8 版本之后引入了 hooks 的概念，使用函数代替类来描述组件：

```javascript
const { useState, useEffect } = React // 引入 hooks，使得函数变得有状态
function ListItem(props) {
  const { title, content } = props
  return (
    <template>
      <p>
        {title}：{content}
      </p>
    </template>
  )
}
function List(props) {
  const [dataSource, setDataSource] = useState([])
  function getDataSource(event) {
    fetch(Date.now()).then((result) => setDataSource(result?.data ?? []))
  }
  useEffect(function () {
    // 函数组件不再具有具体的生命周期，而是使用渲染为单位，每次渲染（浏览器paint）结束会调用对应的副作用函数
    this.getDataSource(Date.now())
  }, []) // 第二个参数传入依赖数组，决定了此次渲染结束后是否要调用此副作用
  return (
    <template>
      <h1>here are the lists</h1>
      <div>
        <button onClick={this.getDataSource}>click and get data</button>
      </div>
      {/* 由于JSX本质上就是调用h函数的JavaScript表达式，故而可以使用JavaScript表达式的全部特性 */}
      {this.state.dataSource.map(({ title, content }) => (
        <ListItem title={title} content={content} />
      ))}
    </template>
  )
}
```

### 基本工作流程

React 每次状态更新的渲染都从根组件开始，依次调用全部子组件的 render 函数，得到完整的组件 VNode 树结构，再把这棵新树与之前的旧树进行对比，对差异之处创建 patch，这就是 diff 算法（具体可以参考官网），最终将这些 patch 应用到平台的实际渲染层上，对于 Web 平台就是浏览器的 DOM 树。由于生成的组件的整个 VNode 结构是树结构，在对比新旧树的时候使用的是递归算法，一旦树的结构过于庞大，那么递归就很消耗性能，造成界面的卡顿或者是短时间的无响应，严重影响用户体验，而且 JSX 本质是 JavaScript 代码，过于灵活，无法在编译组件时候对它进行静态优化（对比于 Vue 的 Template 语法），React 必须在运行时进行优化（动态优化），所以，React 16.8 提出了 fiber 架构（具体可以参考官网），简单的来说，就是将原来的递归比较的结构变成了链表结构，而链表结构可以实现中断再恢复，还能实现不同渲染的优先级，在每次浏览器空闲的时候进行比较，当浏览器需要响应用户操作的时候中断当前比较，再在下次空闲的时候恢复中断的比较，在 React 17 则提出了并发特性并且引入了优先级的概念，React 18 进一步完善了并发特性，对优先级的控制更加精细，React 已经可以看作一个简单的操作系统了，它拥有任务的调度和优先级、时间切片、等等功能。

每个组件的组件状态（对于类组件来说就是它的类实例，对于函数组件来说就是它的 hooks 状态）被附加在各自生成的 VNode 上，下次渲染的时候从旧的 VNode 取到此组件状态进行渲染。

## Vue 的基本工作思想 - Vue2.x

### 基本思想

1. 观察者模式（发布订阅模型）：一个解耦对象之间消息通信的范式，前端常见的设计模式
2. 依赖收集：一个组件的视图和计算属性所需要的数据就是依赖，观察者观察这些依赖的变化从而做出响应的动作，比如依赖的值改变了就通知组件进行更新
3. 响应式化对象：监听数据对象（数据对象上的属性就是依赖）的行为（读取值和修改值），在 Vue2 中使用 ES5 的 Object.defineProperty 劫持它的 setter 和 getter 实现的，在 Vue3 则使用了功能更强大的 ES6 的 Proxy 实现

### Template 模板语法

和 JSX 一样，也是一种描述 VNode 树结构的 DSL 语言，语法借鉴了著名的模板引擎 mustache，它不像 JSX 那么灵活，但是它提供了 vue-template-compiler 静态优化的能力。

```vue
<template>
  <div>
    <!-- 数据对象的name属性被视图使用到了，那么它就成为了依赖，将被依赖收集，它的修改将导致组件重新渲染 -->
    <p style="color: red;">hello {{ name }}</p>
  </div>
</template>
<script lang="javascript">
export default{
  name: 'demo',
  data(){
    // 简单工厂模式，返回本组件需要的数据对象
    return {
      name: 'nat',
    }
  }
}
</script>
```

等于

```javascript
function render() {
  with (this) {
    // this 是组件实例
    // _c = createElement = h
    // _v = createTextVNode
    // _s = toString
    return _c('div', [
      _c('p', { staticStyle: { color: 'red' } }, [_v('hello ' + _s(name))]),
    ])
  }
}
```

### 基本工作流程

每个 Vue 组件是一个对象，这个对象描述了组件的状态（数据对象）、方法、渲染函数、计算属性、生命周期、等等，组件实例首次调用渲染函数的时候，会将渲染函数（Template 模板）使用到的数据都收集起来并且监听它们的改变，渲染函数返回的 VNode 树在首次渲染时被生成平台渲染的结果，并且将其挂载到组件自身属性 `$el` 上，对于 Web 平台就是 DOM 结构，之后，依赖的数据改变了会导致组件重新调用渲染函数，新旧 VNode 树进行 diff 算法对比，形成 patch，再应用到 `$el` 上，使得组件的 `$el` 每次都是最新的，这也意味着 Vue2.x 的更新颗粒度是各自的组件级别的，而非 React 的根组件级别的。

当一个组件的 `v-if` 是假值的时候，它就应该从父组件的 `$el` 移除，那么这个子组件只需要返回空的注释节点即可`document.createComment('')`，而这个返回空的注释节点的操作 Vue2.x 的 `v-if` 指令已经帮组件实现了。
