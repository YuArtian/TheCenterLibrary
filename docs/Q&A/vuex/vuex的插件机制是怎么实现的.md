# vuex的插件机制是怎么实现的

vuex 的插件是采用发布订阅的方式工作的，通过监控 store 的变化来完成额外的任务

在 vuex 实例化 Store 的时候，会依次执行配置数组里的插件（所谓的插件就是函数）

```js
const {
  plugins = [],
  strict = false
} = options
this._subscribers = []
// apply plugins
plugins.forEach(plugin => plugin(this))
```

这里传入了初始的 Store 实例 ，在插件中使用 store.subscribe 订阅 store 变化事件，这是一个完全的发布订阅模式

store.subscribe 的实现就是在 this._subscribers 中添加 fn

```js
subscribe (fn, options) {
	return genericSubscribe(fn, this._subscribers, options)
}
function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn)
  }
  return () => {
    const i = subs.indexOf(fn)
    if (i > -1) {
      subs.splice(i, 1)
    }
  }
}
```

在 commit 中会依次触发 this._subscribers 中注册的 fn

```js
commit (_type, _payload, _options) {
	//...
	this._subscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .forEach(sub => sub(mutation, this.state))
}
```

## vuex持久化插件

```js
function persists (store) {
  let local = localStorage.getItem('VUEX:STATE')
  if(local){
    store.replaceState(local)
  }
  store.subscribe((mutation, state) => {
    localStorage.setItem('VUEX:STATE', JSON.stringify(state))
  })
}
```



