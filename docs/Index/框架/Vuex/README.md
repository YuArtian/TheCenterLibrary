# Vuex

vuex 的本质也是一个 vue 实例，它里面管理了公共部分数据 state，应用中的 vue实例（称为应用vue实例），如果用到了 vuex 中的数据，会在 vuex 数据的 Dep 中加入对应的 watcher，当state中数据更新的时候，应用 vue实例中的 watcher 会执行对应的  update

# Vuex 初始化

Vuex 的初始化分为两个部分，安装（install）和 Store 实例化

## 安装

当我们在代码中通过 `import Vuex from 'vuex'` 的时候，实际上引用的是一个对象

```js
export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}
```

其中，静态的 install 方法是作为 Vue 插件必须要提供的

- Vuex 作为 vue 的插件，实现了 install 方法

- 在 install 方法中，调用 vue.mixin 将 \$store 变量在 beforeCreate 阶段，混入到当前 vue 实例上（如果有 store参数的话）

- 通过 this.\$store = options.parent.store 的方式，把 `options.store` 保存在所有组件的 `this.$store` 中，这个 `options.store` 就是在实例化 `Store` 对象的实例

## Store 实例化

 `Store` 的实例化过程拆成 3 个部分，分别是初始化模块，安装模块 和 初始化 `store._vm`

但在这些之前，会初始化一些内部变量，以供后续使用

```js
// store internal state
    this._committing = false
    this._actions = Object.create(null)
    this._actionSubscribers = []
    this._mutations = Object.create(null)
    this._wrappedGetters = Object.create(null)
```

### 初始化模块

#### 模块的意义

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象，当应用变得非常复杂时，`store` 对象就有可能变得相当臃肿

为了解决以上问题，Vuex 允许我们将 `store` 分割成模块（module）

每个模块拥有自己的 `state`、`mutation`、`action`、`getter`，甚至是嵌套子模块——从上至下进行同样方式的分割

#### 构建模块

从数据结构上来看，模块的设计就是一个树型结构，`store` 本身可以理解为一个 `root module`，它下面的 `modules` 就是子模块，Vuex 使用 ModuleCollection 类来构建完成这颗树

```js
this._modules = new ModuleCollection(options)
```

ModuleCollection 构造函数执行 register 方法，注册生成模块（Module），再递归添加子模块

```js
export default class ModuleCollection {
  constructor (rawRootModule) {
    // register root module (Vuex.Store options)
    this.register([], rawRootModule, false)
  }
  ...
}
```

```js
register (path, rawModule, runtime = true) {
  const newModule = new Module(rawModule, runtime)
  if (path.length === 0) {
    this.root = newModule
  } else {
    const parent = this.get(path.slice(0, -1))
    parent.addChild(path[path.length - 1], newModule)
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, (rawChildModule, key) => {
      this.register(path.concat(key), rawChildModule, runtime)
    })
  }
}
```

** register 的递归方法，依靠 path 记录树状结构的路径，利用 Array.reduce 方法寻找到子节点正确的位置 **

Module 类代表一个模块

对于每个模块而言，`this._rawModule` 表示模块的配置，`this._children` 表示它的所有子模块，`this.state` 表示这个模块定义的 `state`

```js
export default class Module {
  constructor (rawModule, runtime) {
    this.runtime = runtime
    // Store some children item
    this._children = Object.create(null)
    // Store the origin module object which passed by programmer
    this._rawModule = rawModule
    const rawState = rawModule.state

    // Store the origin module's state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }
```





