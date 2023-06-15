# 你有使用过babel-polyfill模块吗？主要是用来做什么的？

Babel默认只转换新的JavaScript句法（syntax），而不转换新的API

比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码

举例来说，ES6在 Array 对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片

Babel默认不转码的API非常多，详细清单可以查看 babel-plugin-transform-runtime 模块的 definitions.js 文件。

