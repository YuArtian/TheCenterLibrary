# VueRouter是如何实现无刷新跳转的

### 简答

利用 history api 或者 hash change 的方式，触发无刷新的改变页面 url

利用 Vue 响应式原理，将路由表设置为响应式的

通过 onpopstate 或者 onhashchange 监听 url 变化，在 url 改变时，同时改变路由表

从而触发 Vue 响应式更新视图

在 url 改变时，切换不同的组件

### 设置监听

在 vue router 初始化的时候，会首先根据用户所选的模式（mode），默认是 hash模式，创建对应的历史管理实例

然后，基于对应的模式，设置监听路径变化的方法

### 路由匹配

使用 vue router时，需要传入 routes 配置，这个配置描述了 路由 和 组件 的对应关系，vue router 内部会重新格式化一下，主要是为了方便后续的查找

在 url 变化的时候，vue router 会动态的匹配当前的路径，根据配置寻找当前路径对应的 组件 和 其父组件

返回 `{path: '/x/xx', matched: [{}]}` 的对应关系，之后会进行更新视图

### 更新视图

由于 Vue 是响应式的，数据变化会自动更新视图

使用 `Vue.util.defineReactive()` 方法，将 _route 属性定义为响应式属性，值为当前匹配到的对应关系

监听到路由变化时，重新给 _route 赋值，从而触发更新

### 渲染视图

vue router 渲染视图依靠 router-view 组件，router-view 是函数式组件

vue-router 根据匹配到的组件数组（this.\$route.matched）进行递归

依据当前 router-view 组件是否有父级 router-view（`this.\$vnode.parent.data.routerView === true`）

来确定自己的 depth 层级，从而实现在对应层级的 router-view 上渲染





