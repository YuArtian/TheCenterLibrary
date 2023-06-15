# 虚拟Dom中的$$typeof属性的作用是什么

> https://juejin.im/post/5d89cbd26fb9a06b2005a597#heading-11



`ReactElement`中有一个 `$$typeof`属性，它被赋值为 `REACT_ELEMENT_TYPE`：

```js
var REACT_ELEMENT_TYPE =  (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) ||  0xeac7;
```

可见， `$$typeof`是一个 `Symbol`类型的变量，这个变量可以防止 `XSS`

