# webpack懒加载原理

## 用法

```js
// 文件：index.js

// 创建一个 button
let btn = document.createElement("button");
btn.innerHTML = "click me";
document.body.appendChild(btn);
async function getAsyncComponent() {
    var element = document.createElement('div');

    // 在 import 的括号里 加注释 /* webpackChunkName: "lodash" */ ，为引入的文件取别名
    const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');

    element.innerHTML = _.join(['Hello!', 'dynamic', 'imports', 'async'], ' ');

    return element;
}
// 点击 button 时，懒加载 lodash，在网页上显示 Hello! dynamic imports async
btn.addEventListener('click', () => {
    getAsyncComponent().then(component => {
        document.body.appendChild(component);
    })
})
```

webpack 内部使用内置组件  [SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin) 分割异步加载代码

上面的懒加载代码里，我们是点击按钮时，才会触发异步加载 `lodash` 的动作

这时候会动态的生成一个 `script` 标签，加载到 `head` 头里

<img src="~@img/webpackPrefetch、webpackPreload 和 webpackChunkName 到底是干什么的_02.jpg"/>



