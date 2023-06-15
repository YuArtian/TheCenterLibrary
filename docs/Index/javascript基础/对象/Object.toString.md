# Object.prototype.toStrinng()

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString

每个对象都有一个 `toString()` 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用

默认情况下，`toString()` 方法被每个 `Object` 对象继承。如果此方法在自定义对象中未被覆盖，`toString()` 返回 "[object *type*]"，其中 `type` 是对象的类型

## 使用 `toString()` 检测对象类型

使用 call 来获取正确的 this 值，从而返回正确的结果

```
var toString = Object.prototype.toString;

toString.call(new Date); // [object Date]
toString(new Date); // [object Object]
```

