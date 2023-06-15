# setState是异步的么

```js
class A extends React.Component {
	handleClick = () => {
		this.setState({x: 1})
		this.setState({x: 2})
		this.setState({x: 3})
		
		setTimeout(() => {
			this.setState({x: 4})
			this.setState({x: 5})
			this.setState({x: 6})
		}, 0)
	}	
	
	render() {
		return (<div onClick={this.handleClick}>点击更新</div>
	}
}
```



setState 并不属于异步操作

在 React 事件处理函数 和 生命周期 中，调用 setState 并不会立即生效是因为 React 的批量更新策略

React 中有更新队列（updateQueue）以及它的批量更新状态（isBatchingUpdate）来实现 批量更新的效果

每一个 React 组件实例化的时候，都会注入一个 更新器（updater），用来管理组件内部 state 的批量更新

而更新队列中 push 进去的都是 需要更新的组件的 updater

setState 可以分为在 合成事件、生命周期中两种触发情况

在合成事件的触发过程中，事件监听函数执行之前（dispatchEvent），会先将 isBatchingUpdate 置为 true

然后依次执行事件函数，在这些函数中执行的 setState 触发

由于 isBatchingUpdate=true，会先将 setState 的参数 particalState 存入 当前 updater 的数组（pendingState）中，然后将当前的 updater 存入 updateQueue

在所有的合成事件的回调函数都触发完成之后，将 isBatchingUpdate 置为 false，再主动触发 batchUpdate，开始更新队列，依次执行队列中的 updater 的 updateComponent 方法



在更新 state 的时候，首先会根据老的 state 获取新的 state，如果 particalState 是对象的话，会进行覆盖

对更新操作进行判断，走入 shouldComponentUpdate 生命周期，进行判断是否更新

如果需要更新的话，就会走更新渲染，diff组件的流程



在声明周期中基本也是一样的



React 还提供 unstable_batchedupdates 来强制 batch

```js
class A extends React.Component {
	handleClick = () => {
		this.setState({x: 1})
		this.setState({x: 2})
		this.setState({x: 3})
		
		setTimeout(() => {
			ReactDOM.unstable_batchedUpdates(() => {
				this.setState({x: 4})
				this.setState({x: 5})
				this.setState({x: 6})
			})
		}, 0)
	}	
	
	render() {
		return (<div onClick={this.handleClick}></div>
	}
}

```

这样就会强制合并 state 了

