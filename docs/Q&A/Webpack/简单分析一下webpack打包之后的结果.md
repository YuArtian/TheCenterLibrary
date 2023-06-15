# 简单分析一下webpack打包之后的结果

比如只有 './src/index.js' 和 './src/a.js' 的情况（index.js 中引用 a.js）

```js
(function (modules) {
  // webpackBootstrap
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    module.l = true;
    return module.exports;
  }
  return __webpack_require__((__webpack_require__.s = "./src/index.js"));
})({
  "./src/a.js": function (module, exports) {
    eval("module.exports = 'yuartian'\n\n//# sourceURL=webpack:///./src/a.js?");
  },

  "./src/index.js": function (module, exports, __webpack_require__) {
    eval(
      'let name = __webpack_require__(/*! ./a.js */ "./src/a.js")\nconsole.log(name)\n\n//# sourceURL=webpack:///./src/index.js?'
    );
  },
});
```

webpack 解析出来的文件就是一个自执行函数，传入的参数就是包含各个模块路径和函数的对象

- key 是文件路径，value 是一个参数为module、exports和`__webpack_require__`的函数
- 函数中用 eval 包裹解析出来的模块字符串
- 其中导入被替换成 webpack 自定义的 `__webpack_require__` 函数
- 导出被替换成 给 webpack module 对象中的 module.exports 属性赋值的形式

webpack 会为所有模块生成模块对象，这个对象中默认值包括 i: moduleId，l：fasle，exports：{}

webpack 会首先传入入口文件的模块函数并执行，然后根据函数内调用的 `__webpack_require__` 递归生成各个模块对象

通过 module.exports 来确定模块的导出值

## 大致流程

webpack 会把所有解析出来的模块变成对象

通过一个唯一的入口去加载模块对象，递归出依赖关系

然后通过入口来运行所有的文件



