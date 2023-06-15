# Object.defineProperty的应用

定义对象上的属性

```js
Object.defineProperty(obj, prop, descriptor)
```

其中 prop 可以为 属性名 或者 Symbol

## 分类

对象属性描述符有两种形式：数据描述符 和 存取描述符

一个描述符只能是这两者其中之一；不能同时是两者

### 公用键值

#### configurable

是否可配置，默认为 false

设置为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除

#### enumerable

是否可枚举，默认为 false

设置为 true 时，该属性才会出现在对象的枚举属性中

> 混用下面的两种键值会报错

### 数据描述符

#### value

值，默认为 undefined

可以设置为任何有效的 JavaScript 的值

#### writable

是否可写，默认为 false

设置为 true 时，上面的 value 属性才能被 [赋值运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators) 改变

### 存取描述符

#### get

getter函数，默认为 undefined

访问该属性时，执行此函数，不传入参数，返回值会被用作属性的值

#### set

setter函数，默认为 undefined

属性值被修改时，会调用此函数，传入被赋予的新值



