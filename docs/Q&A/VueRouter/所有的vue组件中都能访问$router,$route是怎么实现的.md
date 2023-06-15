# 所有的vue组件中都能访问\$router,\$route是怎么实现的

VueRouter 作为 Vue 插件，使用的时候需要调用 Vue.use()，必须实现 install 方法

VueRouter 在 install 方法中，执行了 Vue.mixin 在 beforeCreate 阶段混入了用户之前创建的 VueRouter 实例

因为 Vue 渲染时，创建组件的顺序是先父后子，父组件的 beforeCreate 会先触发，并且只有在根组件上才有

`this.$options.router` 属性（这个 `router` 是用户自己实例化后，传入最开始的new Vue({router}) 中）

所以，根组件中取到 router 实例，赋值到根组件的 _routerRoot 上

没有 `this.$options.router`  的就是子组件，子组件通过 `this.$parent._routerRoot` 找到 _routerRoot 属性，并赋值在子组件上

这样，整个 SPA 的组件树中，所有的组件就都能直接通过 this 访问到 _routerRoot 了

最后，再使用 `Object.defineProperty` ，将 `this._routerRoot._router` 代理到 `$router` 上

将 `this._routerRoot._route` 代理到 `$route` 上，实现访问属性时的劫持

这个套路，vuex 中的 \$store 也是这么做的

```js
export function install (Vue) {
  //...
  Vue.mixin({
    beforeCreate () {
      //this 就是当前的 vue 实例
      //如果有 this.$options.router，证明是根实例
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        //...
      //如果没有就是 vue 的子组件实例
      } else {
        //让子组件的 _routerRoot 向上寻找，等于 父组件
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
     	//...
    },
		//...
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
  //...
}
```

