# webpackPrefetch、webpackPreload 和 webpackChunkName 到底是干什么的

这几个名词其实都是 webpack [魔法注释（magic comments）](https://webpack.docschina.org/api/module-methods/#magic-comments)里的，文档中说了 6 个配置，配置都可以**组合**起来用

## 一句话总结

`webpackChunkName` 是为预加载的文件取别名，`webpackPreload` 会在浏览器闲置下载文件，`webpackPreload` 会在父 chunk 加载时并行下载文件

## webpackChunkName

异步加载中，给异步组件生成的 bundle 定义名字

```js
async function getAsyncComponent() {
    var element = document.createElement('div');

    // 在 import 的括号里 加注释 /* webpackChunkName: "lodash" */ ，为引入的文件取别名
    const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');

    element.innerHTML = _.join(['Hello!', 'dynamic', 'imports', 'async'], ' ');

    return element;
}
```

生成打包文件如下

<img src="~@img/webpackPrefetch、webpackPreload 和 webpackChunkName 到底是干什么的_01.jpg"/>

生成的异步 bundle 的文件名默认会有 vendors~lodash 前缀

其实 webpack 懒加载是用内置的一个插件 [SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin) 实现的，这个插件里面有些[默认配置项](https://webpack.docschina.org/plugins/split-chunks-plugin/#optimization-splitchunks)，比如说 `automaticNameDelimiter`，默认的分割符就是 `~`，所以最后的文件名才会出现这个符号

若想打包过后的文件名不带 `vendors~` 前缀，可以修改 `webpack.common.js` 中 `optimization` 配置项

详情看 [splitChunks 配置项详细解释](./splitChunks有哪些配置项.md)

[懒加载（异步加载）原理](./webpack懒加载原理.md)

## webpackPrefetch

如果 import 的时候添加：

```js
const { default: _ } = await import(/* webpackChunkName: "lodash" */ /* webpackPrefetch: true */ 'lodash');
```

就会以 `<link rel="prefetch" as="script">` 的形式预拉取 lodash 代码：

<img src="~@img/webpackPrefetch_01.jpg"/>

这个异步加载的代码不需要手动点击 button 触发，webpack 会在父 chunk 完成加载后，闲时加载 `lodash` 文件

## webpackPreload

`webpackPreload` 是预加载当前导航下可能需要资源，他和 `webpackPrefetch` 的主要区别是：

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻

