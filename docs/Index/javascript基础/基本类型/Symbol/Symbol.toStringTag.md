# Symbol.toStringTag

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag



Symbol.toStringTag 是一个内置 symbol

Symbol.toStringTag 的值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签

通常只有内置的 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法会去读取这个标签并把它包含在自己的返回值里

## 类型判断（Object.prototype.toString）

使用 Object.prototype.toString 可以精确的判断类型

许多内置的 JavaScript 对象类型即便没有 `toStringTag` 属性，也能被 `toString()` 方法识别并返回特定的类型标签

```javascript
Object.prototype.toString.call('foo');     // "[object String]"
Object.prototype.toString.call([1, 2]);    // "[object Array]"
Object.prototype.toString.call(3);         // "[object Number]"
Object.prototype.toString.call(true);      // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null);      // "[object Null]"
// ... and more
```

但是，另外一些对象类型则不然，`toString()` 方法能识别它们是因为引擎为它们设置好了 `toStringTag` 标签：

```js
Object.prototype.toString.call(new Map());       // "[object Map]"
Object.prototype.toString.call(function* () {}); // "[object GeneratorFunction]"
Object.prototype.toString.call(Promise.resolve()); // "[object Promise]"
// ... and more
```

## 用 toStringTag 自定义类型

给对象自定义类型

```javascript
var a = {}
a[Symbol.toStringTag] = 'a'
console.log('typeof a',Object.prototype.toString.call(a))// [object a]
```

也可以为自己的类自定义类型标签

```js
class ValidatorClass {
  get [Symbol.toStringTag]() {
    return "Validator";
  }
}

Object.prototype.toString.call(new ValidatorClass()); // "[object Validator]"
```

