# React 和 Vue 的基本工作原理

## 两者的基本思想

两者的基本思想都是：`view = render(state)`

组件的渲染函数`render`根据组件当前状态`state`得出组件最新的视图`view`。

渲染函数得出的视图是 VNode 树结构，它与平台无关，每次更新都会生成一颗最新的 VNode 树，再照着新树修改旧树，最终旧树与新树相同，此过程就是 patch。而 patch 过程由各自的平台渲染器（以 React 举例，React 在 Web 平台的渲染器是 ReactDOM，在移动平台的渲染器是 ReactNative）实现。

一个组件就是封装了结构`VNode`、行为`JavaScript`和样式`CSS`的组件实例，由`JavaScript`维持着组件当前的状态，且控制着组件当前的结构和样式。

## React 的基本工作原理

### 基本思想

React 组件每次的重新渲染都从状态发生改变的组件开始，递归地调用它的全部子组件的渲染函数，且 patch 新旧 VNode。

### JSX 语法

React 使用 JSX(JavaScript XML) 这个特定的 DSL 语言来描述 VNode，是 JavaScript 的子集：

```jsx
const name = 'nat'
// 花括号里面的值将被视作JavaScript表达式
const greeting = <p style={{ color: 'red' }}>hello {name}</p>
```

JSX 的本质是 JavaScript 表达式，上述的 JSX 经过编译得到如下的 JavaScript 代码：

```javascript
const { createElement: h } = React
// 社区习惯性地将createElement（创建VNode的函数）称为h函数，因为VNode的思想最早来源于hyperscript（地址：https://github.com/hyperhype/hyperscript）
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

组件拥有和维持着它的状态，如下：

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
      // mock
      fetch(Date.now()).then((result) =>
        this.setState({ dataSource: result?.data ?? [] })
      )
    }.bind(this) // 事件处理器必须要绑定组件的this，因为获取和更新状态都要从this着手
    this.clearDataSource = () => this.setState({ dataSource: [] }) // 也可以使用箭头函数解决this绑定问题
  }
  render() {
    // 返回本组件当前最新的视图，即VNode
    return (
      <template>
        <h1>here are the lists</h1>
        <div>
          <button onClick={this.getDataSource}>click and get data</button>
        </div>
        {/* 由于JSX本质上就是调用h函数的JavaScript表达式，故而可以使用JavaScript表达式的全部特性，相当灵活 */}
        {this.state.dataSource.map(({ title, content }) => (
          {/* 向子组件传递状态（由表达式计算而来），表达式可以是任何合法的JavaScript表达式，甚至可以传入VNode 或 render函数 */}
          {/* 向子组件传递父组件的方法，从而达到在子组件修改父组件状态的能力（闭包特性） */}
          <ListItem title={title} content={content} clear={this.clearDataSource} />
        ))}
      </template>
    )
  }
  onMount() {
    // 组件被挂载时开始加载数据
    this.getDataSource(Date.now())
  }
}
```

上述这种使用**类**的方式描述组件很形象，组件拥有且维护着自己的状态，组件拥有改变状态的方法，组件通过 render 方法输出组件当前最新状态的视图，但是存在一些缺陷：

1. 面向类、对象的 OOP 编程思想强调的是：封装、继承、多态，而组件只是很纯粹的描述当前状态下的视图，通常用不到 2 级以上的继承，更用不到多态，仅仅用到了封装
2. JavaScript 归根到底是原型继承，ES6 的 class 也只是语法糖，JavaScript 更适合走函数式编程的风格
3. 在使用类的时候会经常用到 this 关键字，而 this 关键字在 JavaScript 很具有误导性，它与传统 Java 的 this 截然不同
4. class 的内存开销较大
5. 使用 高阶组件 HOC 或 混入 的方式来复用组件的公共逻辑的维护性很差
6. ...

所以从 React 16.8 版本开始引入了 hooks 的概念，使用函数代替类来描述组件：

```javascript
// 由于函数没有实例，从而引入 hooks，使得函数变得有状态
// 从广义来讲，hook 本质就是维持一些状态或提供一些特定功能的解决方案，那么自然而然就能复用组件公共的逻辑，这便是自定义 hooks
const { useState, useEffect } = React
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
    // 函数组件不再具有具体的生命周期，而是以渲染为单位，每次渲染（浏览器的paint）结束会调用对应的副作用函数
    this.getDataSource(Date.now())
  }, []) // 第二个参数传入依赖数组，决定了此次渲染结束后是否要调用此副作用，空数组表示：此组件的首次渲染和被卸载的时候触发副作用
  return (
    <template>
      <h1>here are the lists</h1>
      <div>
        <button onClick={this.getDataSource}>click and get data</button>
      </div>
      {this.state.dataSource.map(({ title, content }) => (
        <ListItem title={title} content={content} />
      ))}
    </template>
  )
}
```

### 基本工作流程总结

React 组件的每次渲染都从状态发生改变的组件开始，递归地调用它的全部子组件的渲染函数，得到当前最新的 VNode 树，再 patch 新旧 VNode，使得渲染目标保持最新。由于 VNode 是树结构，故使用递归进行 patch，一旦树结构过于复杂，递归就很消耗性能，造成界面的卡顿甚至是短时间的无响应，从而影响用户的体验，而且 JSX 本质是 JavaScript 代码，过于灵活，无法在组件编译时对它的 render 函数进行静态优化（对比于 Vue 的 Template 语法），导致了 React 必须在运行时进行优化（动态优化）。

因此 React 16.8 提出了 [fiber](https://github.com/acdlite/react-fiber-architecture) 架构，简而言之，就是将原来需要递归比较的 VNode 的树结构变成了链表结构，在链表结构的基础上实现了：时间切片、暂停恢复、优先级调度、并发、等等的高级特性。

在 React 16.8 提出了时间切片、暂停恢复和基于过期算法的优先级调度系统，在客户端用户代理空闲的时候才进行 patch，当用户代理需要响应用户操作的时候暂停当前 patch，再在下次空闲的时候恢复暂停的比较，高优先级的 patch 任务将暂停当前的低优先级，比如响应用户的输入框输入。

在 React 17 提出了并发特性，而且使用基于 lanes 的算法重构了优先级调度系统。

在 React 18 进一步完善了并发特性和优先级调度系统，对外暴露了一些特定的底层 API 给上游框架使用，比如 next.js，现在 React 俨然发展成了一个更加注重底层的框架，应用开发不应该直接基于 React 本身进行开发，而是使用基于 React 的上游框架进行开发。

React 越来越像一个操作系统了。

每个组件的组件状态（对于类组件来说就是它的类实例，对于函数组件来说就是它的 fiber 节点）被附加在各自生成的 VNode 上，下次渲染的时候从旧 VNode 取到此组件的当前状态进行本次渲染。

Preact 框架（版本 1 ~ 8）将组件实例和组件实例对应的 DOM 元素相互关联，组件实例通过 `base` 字段引用它的 DOM 节点，而 DOM 节点通过 `__component` 引用它的组件实例，从而实现组件实例的持久化保存，而且它直接把旧的 DOM 和新的 VNode 进行对比，使得 diff 过程更快。

## Vue 的基本工作思想 - Vue2

### 基本思想

1. 观察者模式（发布订阅模型）：一个解耦对象之间消息通信的范式，前端常见的设计模式
2. 依赖收集：一个组件`template`、`computed`和`watch`包含的数据就是依赖，观察者观察这些依赖的变化从而做出对应的响应，比如依赖的值改变了就通知组件进行更新
3. 响应式化的对象：每个组件的数据是一个对象，Vue2 使用 ES5 的 `Object.defineProperty` 方法递归地将对象的全部属性转换为对应的 getter 和 setter 从而实现数据劫持，在 getter 中收集当前依赖的 watcher，在 setter 中触发当前依赖的全部 watcher

### Template 模板语法

和 JSX 一样，也是一种描述 VNode 树结构的 DSL 语言，语法借鉴了著名的模板引擎 mustache，它不像 JSX 那么灵活，但是它提供了 vue-template-compiler 静态优化的能力，当 compiler 把 Template 编译成由 h 函数组成的 render 函数时，可以将静态不发生改变的 VNode 结构固定，在新旧 VNode 对比时，跳过被固定的 VNode 结构从而提高性能。

```vue
<template>
  <div>
    <!-- 数据name被视图（即在render函数执行的时候读取了此name的值）使用到了，那么它就成为了视图的一个依赖，它会收集当前的watcher（当前是render watcher），当它修改时将触发它已经收集的watcher，也就使得组件重新渲染了 -->
    <p style="color: red;">hello {{ name }}</p>
    <DisplayPanel v-on:click="resetName">
      <div slot="content" slot-scope="result">the content of DisplayPanel</div>
    </DisplayPanel>
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
  },
  methods: {
    resetName(){
      this.name = 'nat'
    }
  },
}
</script>
```

等于（被 vue-template-compiler 转换为对应的 render 函数）

```javascript
function anonymous() {
  // this 是组件实例
  // _c = createElement = h
  // _v = createTextVNode
  // _s = toString
  // _u = resolveScopedSlots 去目标元素 DisplayPanel 寻找 key 是 content 的插槽 slot
  with (this) {
    return _c(
      'div',
      [
        _c('p', { staticStyle: { color: 'red' } }, [_v('hello ' + _s(name))]),
        _c('DisplayPanel', {
          // 和 React 把父组件的方法传递给子组件一样
          // 此处就能清晰的看出：子组件 $emit 触发的是组件自身的对应方法（$emit 是在组件自身上找对应的方法），而这些方法是父组件传来的
          // 使用模板的写法，很容易理解为：子组件和父组件真的有一套消息机制，子组件 $emit 把事件传到了父组件，父组件响应这个事件，不过，对于只是使用 Vue 而不去研究它底层的话，这样的理解是相当棒的，它使父组件向子组件的通信高度抽象
          on: { click: resetName },
          scopedSlots: _u([
            {
              key: 'content',
              // Vue 的插槽相当于 React 的 父组件直接向子组件传递 render 函数（动态插槽） 或 VNode（静态插槽）
              fn: function (result) {
                return _c('div', {}, [_v('the content of DisplayPanel')])
              },
            },
          ]),
        }),
      ],
      1
    )
  }
}
```

### 基本工作流程总结

每个 Vue 组件是一个配置对象（选项式 API 语法），配置对象描述了组件的初始数据、方法、render 函数、计算属性、生命周期、等等，当组件实例首次渲染时，会将 render 函数包裹在 watcher 里面（这个 watcher 就是 render watcher）且执行它，render 函数里面使用到的数据在被读取时将触发它的 getter，在 getter 里面将当前的 watcher 收集进去，此时这个数据将变成一个依赖且被一个 watcher 观察者观察着，render 函数返回的 VNode 树在首次渲染时被生成对应平台的渲染结果，且将其挂载到组件自身属性 `$el` 上，对于 Web 平台就是 DOM 树，之后，依赖改变了会导致它的 setter 被执行，setter 将它已经收集的全部 watcher 都执行，当执行了 render watcher 也就使得组件开始重新渲染，新旧 VNode 树将进入 diff + patch 的过程，最终保持组件的 `$el` 最新，这也意味着 Vue2 的更新颗粒度是组件级别的，而非 React 发生改变的组件的全部子组件。

Vue 渲染一个组件树的流程：

1. 初始化组件实例
2. 执行`new Watcher(vm, updateComponent, noop, function before(){})`，此 watcher 就是渲染 watcher
3. 在 watcher 初始化的`value = this.getter.call(vm, vm)`阶段将执行 updateComponent 函数，即执行了`vm._update(vm._render())`
4. `vm._render()`返回此组件的 VNode 树，对于组件下的子组件执行`createElement(componentOptions, data, children)`，且进入 createComponent 函数，在这里将执行组件的实例化（回到了步骤`1`），将实例化的子组件 push 到父组件的 chilren 属性里，且安装对应的 snabbdom 的钩子（init、prepatch、insert 和 destroy），最终返回`new VNode('vue-component-{uid}-{name}', data, children)`，此 VNode 有一个 componentInstance 引用了对应的组件实例
5. 接下来继续执行 updateComponent 的`vm._update(vm._render())`，进入了 update 函数
6. 首次 update，执行`patch(vm.$el, VNode)`，由于是首次执行，vm.$el 为空，将执行 createElm 函数，按照 VNode 创建对应的 dom
7. 在 createElm 会执行 createChildren 创建它的子 VNode
8. 如果遇到了自定义组件会执行 createComponent 函数，把组件实例上的 $el 赋值给此自定义组件的 VNode 的 el，且将此 el 使用`appendChild`插入到父组件的 el
9. 如此，自定义组件的 el 就被插入到父组件的 el
10. 如果数据发生了变化，执行了新的`vm._update(vm._render())`，在 render 时候，会去父组件的 children 属性里寻找是否已经存在了此组件，存在的话直接使用此组件实例的 render 函数得到对应的 VNode
11. 接下来还是 update 操作，在进行 patchVNode 自定义组件时，会执行它的 prepatch 钩子，此钩子执行了 updateChildComponent，将新 VNode 的 props、listeners、attrs 和 children 赋值给组件实例，如果值不一样，自然而然就触发了子组件的 update，子组件的更新就被执行
12. 如此往复

当一个组件的 `v-if` 是假值的时候，它就应该从父组件的 `$el` 移除，那么最简单的方法就是这个子组件返回一个空的注释节点即可`document.createComment(' v-if = false ')`：

```vue
<template>
  <div>
    <p>Hello</p>
    <p v-if="false">Hello Again</p>
  </div>
</template>
```

对应的 render 函数：

```javascript
function anonymous() {
  with (this) {
    return _c('div', [
      _c('p', [_v('Hello')]),
      // 可以看出 v-if 指令就是简单的条件表达式
      // 当 false 时执行 _e() 返回一个注释节点
      false ? _c('p', [_v('Hello Again')]) : _e(),
    ])
  }
}
```
