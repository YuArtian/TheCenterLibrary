# React的diff策略

> [http://www.zhufengpeixun.cn/2020/html/62.8.react-source.html#t5110.%20diff%20%E7%AD%96%E7%95%A5](http://www.zhufengpeixun.cn/2020/html/62.8.react-source.html#t5110. diff 策略)
>
> https://zh-hans.reactjs.org/docs/reconciliation.html

## 原因

在某一时间节点调用 React 的 `render()` 方法，会创建一棵由 React 元素组成的树

在下一次 state 或 props 更新时，相同的 `render()` 方法会返回一棵不同的树

React 需要基于这两棵树之间的差别来判断如何有效率的更新 UI 以保证当前 UI 与最新的树保持同步

## 策略

正常的比对需要挨个对比虚拟节点，React 依据三个策略，对 diff 过程进行了优化

- Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计
- 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构
- 对于同一层级的一组子节点，它们可以通过唯一`key`进行区分

## Diffing算法

React 中 state 或者 props 变化之后，触发 render 函数，重新生成了一棵新树。新树老树需要对比结果会存入 diffQueue，统一执行

当开始对比两颗树时，React 首先比较两棵树的根节点类型，当根节点为不同类型的元素时，React 会拆卸原有的树并且建立起新的树

> 当拆卸一棵树时，对应的 DOM 节点也会被销毁。组件实例将执行 `componentWillUnmount()` 方法
>
> 当建立一棵新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中。组件实例将执行 `componentWillMount()` 方法，紧接着 `componentDidMount()` 方法
>
> 所有跟之前的树所关联的 state 也会被销毁

如果节点类型相同，则保留 DOM 节点，只更新属性 props

如果节点是 React 组件，会先触发组件更新时期的生命周期，然后递归 diff 子节点

### 深度优先的递归/Tree Diff

在递归子节点时，React 会采用深度优先的算法，并且记录递归深度 depth，并且只会对同一层级的节点进行比较

当出现节点跨层级移动时，并不会出现想象中的移动操作，而是整个重新创建

### Component Diff

- 如果是同一类型的组件，按照原策略继续比较 `virtual DOM tree`
- 如果不是，则将该组件判断为`dirty component`,从而替换整个组件下的所有子节点

### Element Diff

- 当节点处于同一层级时，React diff 提供了三种节点操作,分别为：INSERT(插入)、MOVE(移动)和 REMOVE(删除)
- INSERT 新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作
- MOVE 在老集合有新 component 类型，就需要做移动操作，可以复用以前的 DOM 节点
- REMOVE 老 component 不在新集合里的，也需要执行删除操作

React 会利用 lastIndex（最近一个不需要移动的老节点的mountIndex）和 老节点的 mountIndex，移动可复用节点

遍历新节点时，查找老节点中可复用的节点，如果有可以复用的节点时，进行 index 的对比：

- 老节点的 mountIndex 大于 lastIndex 的，不需要移动，保持位置不变，更新 lastIndex 为老节点的 mountIndex
- 如果小于，则需要移动到新节点的位置，不用改变 lastIndex

### Key

提供 key 值，可以帮助 React 更好的复用节点



