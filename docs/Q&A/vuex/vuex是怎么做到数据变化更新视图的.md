# vuex是怎么做到数据变化更新视图的

## 为什么store变化了视图就会更新

因为 vuex 的 state 也是响应式数据，vuex 中的 state 其实就是一个 vue 实例

```js
// ./src/store.js
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //...
  },
})

// vuex
class Store {
  constructor (options = {}) {//...}
  //...
  //使用取值函数（getter）拦截 state 属性
  get state(){
    return this._vm._data.$$state
  }
  //...
  resetStoreVM(this, state)
  //...
}
//resetStoreVM 中设置响应式 state
function resetStoreVM(store, state, hot){
	//...
  store._vm = new Vue({
    data: {
      $$state: state
    }
  })
  //...
}
```

这样，state 变成了响应式对象，参与 vue 实例的 依赖收集 和 派发更新的过程

`store._vm = new Vue({data: { $$state: state }})` 中

由于这个实例中并没有设置 `el` 属性，所以不会触发 vue.$mount() 过程，只走入了 initState 设置响应式属性

```js
// vue\src\core\instance\init.js
export function initMixin(Vue: Class<Component>){
  Vue.prototype._init = function (options?: Object) {
    //...
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
    //...
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

如果 vue 组件中使用了  `this.$store.xxx`

在 vue 组件初始化阶段，执行 _init 方法，

