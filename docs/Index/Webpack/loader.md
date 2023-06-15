# loader

> https://webpack.docschina.org/api/loaders/
>
> https://webpack.docschina.org/concepts/loaders/
>
> https://juejin.im/post/5bc1a73df265da0a8d36b74f



所谓 loader 只是一个导出为函数的 JavaScript 模块。[loader runner](https://github.com/webpack/loader-runner) 会调用这个函数，然后把上一个 loader 产生的结果或者资源文件(resource file)传入进去。函数的 `this` 上下文将由 webpack 填充，并且 [loader runner](https://github.com/webpack/loader-runner) 具有一些有用方法，可以使 loader 改变为异步调用方式，或者获取 query 参数

第一个 loader 的传入参数只有一个：资源文件(resource file)的内容，content

compiler 需要得到最后一个 loader 产生的处理结果。这个处理结果应该是 `String` 或者 `Buffer`（被转换为一个 string），代表了模块的 JavaScript 源码。另外还可以传递一个可选的 SourceMap 结果（格式为 JSON 对象）

## 同步loader

如果是单个处理结果，可以在**同步模式**中直接返回。如果有多个处理结果，则必须调用 `this.callback()`

`this.callback` 方法更灵活，因为它允许传递多个参数，而不仅仅是`content`

## 异步loader

在**异步模式**中，必须调用 `this.async()`，来指示 [loader runner](https://github.com/webpack/loader-runner) 等待异步结果，它会返回 `this.callback()` 回调函数，随后 loader 必须返回 `undefined` 并且调用该回调函数

## loader中的this

loader中的 `this` 既不是webpack实例，也不是compiler、compilation、normalModule等这些实例。而是loader-runner构造的loaderContext对象，提供了各种loader API

## 使用

在你的应用程序中，有三种使用 loader 的方式：

- [配置](https://webpack.docschina.org/concepts/loaders/#configuration)（推荐）：在 **webpack.config.js** 文件中指定 loader
- [内联](https://webpack.docschina.org/concepts/loaders/#inline)：在每个 `import` 语句中显式指定 loader
- [CLI](https://webpack.docschina.org/concepts/loaders/#cli)：在 shell 命令中指定它们









