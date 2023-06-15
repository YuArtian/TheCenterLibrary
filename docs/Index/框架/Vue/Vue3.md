# Vue3

Vue3.0 目前正式进入 beta 阶段

> https://juejin.im/post/5dd3d4dae51d453d493092da
>
> https://composition-api.vuejs.org/api.html#setup



## 进入Beta阶段意味着什么

- 合并并实施所有计划中的RFC
- 现在的重点是稳定性和库集成

目前，所有被纳入计划的RFC已经实现了，接下来Vue团队的重点是让Vue 3变得更加稳定，以及让vue相关的第三方库支持vue 3

## 3.0对比2.x有哪些重要变更

> https://juejin.im/post/5e9fb4ece51d4547170aafe4



**Performance**：性能更比`Vue 2.0`强。（update 性能提高1.3-2倍和ssr服务端渲染速度快2-3倍，基于bechmark）

**Tree shaking support：**可以将无用模块“剪枝”。

**Composition API：**组合`API `相对于` Vue2.x `的`Options API`（后面细讲）

**Fragment, Teleport, Suspense**

**Better TypeScript support：**更优秀的Ts支持

**Custom Renderer API：**暴露了自定义渲染 API

### 性能提升

##### 优化模板编译

增加 PacthFlag 标志，相当于编译时生成一个hint

JS runtime在运行的时候，只会对带有 `PacthFlag` 的结点进行真正的追踪

在真正的更新的时候，会直接跳到该结点，比较该结点文字的变化。不需要去关注其他属性和绑定的变化

进而也改进了 diff 算法

之前的 diff 算法需要遍历所有动态和静态的节点

旧的 diff 过程：

> https://zhuanlan.zhihu.com/p/81752104
>
> https://zhuanlan.zhihu.com/p/99015402

在Vue 3.0的Diff的算法中，只需在Block中寻找带`PacthFlag`的结点，只要把这些结点检查一遍就行了，这样就解决的传统Diff算法中最耗时最浪费性能的部分

##### Tree shaking support

- 可以将无用模块“剪辑”，仅打包需要的（比如 v-model，用不到就不会打包）。

- 一个简单“

  ```
  HelloWorld
  ```

  ”大小仅为：13.5kb

  - 11.75kb，仅`Composition API`。

- 包含运行时完整功能：22.5kb

  - 拥有更多的功能，却比`Vue 2`更迷你。

很多时候，我们并不需要 `vue`提供的所有功能，在 `vue 2` 并没有方式排除掉，但是 3.0 都可能做成了按需引入

##### Composition API

> https://composition-api.vuejs.org/api.html#setup



与`React Hooks` 类似的东西，实现方式不同

- 可与现有的 `Options API`一起使用
- 灵活的逻辑组合与复用
- `vue 3`的响应式模块可以和其他框架搭配使用

混入(`mixin`) 将不再作为推荐使用， `Composition API`可以实现更灵活且无副作用的复用代码

##### Fragment

- 不再限于模板中的单个根节点
- `render` 函数也可以返回数组了，类似实现了 `React.Fragments` 的功能 。
- '`Just works`'



