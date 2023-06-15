# 为什么代码中一定要引入React



`JSX`只是为 `React.createElement(component,props,...children)`方法提供的语法糖。

所有的 `JSX`代码最后都会转换成 `React.createElement(...)`， `Babel`帮助我们完成了这个转换的过程。

所以使用了 `JSX`的代码都必须引入 `React`

