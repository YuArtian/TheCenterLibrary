# loader 的执行顺序

> https://imweb.io/topic/5d4a94a08db073cf44ca8cd0
>
> https://webpack.docschina.org/api/loaders/



Loader 会从右到左，从下到上的依次执行

- 最后的 loader 最早调用，将会传入原始资源内容
- 第一个 loader 最后调用，期望值是传出 JavaScript和 source map（可选）
- 中间的 loader 执行时，会传入前一个 loader 传出的结果



## 控制loader执行

loader **总是**从右到左地被调用。有些情况下，loader 只关心 request 后面的**元数据(metadata)**，并且忽略前一个 loader 的结果

在实际（从右到左）执行 loader 之前，会先**从左到右**调用 loader 上的 `pitch` 方法

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        //...
        use: [
          'a-loader',
          'b-loader',
          'c-loader'
        ]
      }
    ]
  }
};
```

```diff
|- a-loader `pitch`
  |- b-loader `pitch`
    |- c-loader `pitch`
      |- requested module is picked up as a dependency
    |- c-loader normal execution
  |- b-loader normal execution
|- a-loader normal execution
```

如果 pitch 方法有返回值则会跳过 loader，如果 `b-loader` 的 `pitch` 方法返回了一些东西：

```javascript
module.exports = function(content) {
  return someSyncOperation(content);
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  if (someCondition()) {
    return 'module.exports = require(' + JSON.stringify('-!' + remainingRequest) + ');';
  }
};
```

```diff
|- a-loader `pitch`
  |- b-loader `pitch` returns a module
|- a-loader normal execution
```

