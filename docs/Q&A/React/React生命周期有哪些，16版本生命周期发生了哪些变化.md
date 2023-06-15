# `React`生命周期有哪些，16版本生命周期发生了哪些变化

# 15

初始化阶段

- `constructor` 构造函数
- `getDefaultProps` `props`默认值
- `getInitialState` `state`默认值

挂载阶段

- `componentWillMount` 组件初始化渲染前调用
- `render` 组件渲染
- `componentDidMount`组件挂载到 `DOM`后调用

更新阶段

- `componentWillReceiveProps` 组件将要接收新 `props`前调用
- `shouldComponentUpdate` 组件是否需要更新
- `componentWillUpdate` 组件更新前调用
- `render` 组件渲染
- `componentDidUpdate` 组件更新后调用

卸载阶段

- `componentWillUnmount` 组件卸载前调用



# 16

- 初始化阶段

- - `constructor` 构造函数
  - `getDefaultProps` `props`默认值
  - `getInitialState` `state`默认值

- 挂载阶段

- - static getDerivedStateFromProps(props,state)
  - `render`
  - `componentDidMount`

> `getDerivedStateFromProps`：组件每次被 `rerender`的时候，包括在组件构建之后(虚拟 `dom`之后，实际 `dom`挂载之前)，每次获取新的 `props`或 `state`之后；
>
> 每次接收新的props之后都会返回一个对象作为新的 `state`，返回null则说明不需要更新 `state`；
>
> 配合 `componentDidUpdate`，可以覆盖 `componentWillReceiveProps`的所有用法

- 更新阶段

- - static getDerivedStateFromProps(props,state)
  - `shouldComponentUpdate`
  - `render`
  - `getSnapshotBeforeUpdate(prevProps,prevState)`
  - `componentDidUpdate`

> `getSnapshotBeforeUpdate`：触发时间: `update`发生的时候，在 `render`之后，在组件 `dom`渲染之前；返回一个值，作为 `componentDidUpdate`的第三个参数；配合 `componentDidUpdate`, 可以覆盖 `componentWillUpdate`的所有用法

- 卸载阶段

- - `componentWillUnmount`

- 错误处理

- - `componentDidCatch`

`React16`新的生命周期弃用了 `componentWillMount、componentWillReceivePorps，componentWillUpdate`新增了 `getDerivedStateFromProps、getSnapshotBeforeUpdate`来代替弃用的三个钩子函数。

> `React16`并没有删除这三个钩子函数，但是不能和新增的钩子函数混用， `React17`将会删除这三个钩子函数，新增了对错误的处理（ `componentDidCatch`）

