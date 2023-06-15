# React 优化措施

## PurComponent 和 memo

> https://zhuanlan.zhihu.com/p/94618828
>
> https://imweb.io/topic/598973c2c72aa8db35d2e291

memo的实现中，`updateMemoComponent` 函数决定是否退出渲染取决于以下两点：

- 当前 props 与 nextProps 是否相等；
- 即将渲染组件的引用是否与 workInProgress Fiber 中的引用是否一致；

只有二者都为真，才会退出渲染



