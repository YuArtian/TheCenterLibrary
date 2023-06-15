# 实现一个Object.is()

来自 React 源码中 shallowEqual 浅比较方法

```js
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}
```



JS 为我们提供了全等操作符 ===，它不会进行类型转换，也就是说如果两个值一样，必须符合类型也一样。但是，它还是有两种疏漏的情况

```js
+0 === -0 // true，但我们期待它返回false
NaN === NaN // false，我们期待它返回true
```

Object.is修复了=== 这两种判断不符合预期的情况

这样就使得Object.is()总是返回我们需要的结果。 它在下面6种情况下，会返回true

- 两个值都是 undefined
- 两个值都是 null
- 两个值都是 true 或者都是 false
- 两个值是由相同个数的字符按照相同的顺序组成的字符串
- 两个值指向同一个对象
- 两个值都是数字并且
  - 都是正零 +0
  - 都是负零 -0
  - 都是 NaN
  - 都是除零和 NaN 外的其它同一个数字

可以看出Object.is可以对基本数据类型:null,undefined,number,string,boolean做出非常精确的比较，但是对于引用数据类型是没办法直接比较的