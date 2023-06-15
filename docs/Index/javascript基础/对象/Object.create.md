# Object.create()

创建一个新对象，使用现有的对象来提供新创建的对象的 \_\_proto\_\_

```javascript
Object.create(proto[, propertiesObject])
```

```js
var o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);
```

```js
var o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { 
    writable:true,
    configurable:true,
    value: "hello"
  },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
});
```

## Object.create(null)

使用 Object.create(null) 创建的对象上没有任何多余的属性，是纯粹的空对象，许多框架和库中都有应用

## Polyfill

不支持 null 和 配置对象属性

```js
if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + proto);
        } else if (proto === null) {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }

        if (typeof propertiesObject != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

        function F() {}
        F.prototype = proto;
      
        return new F();
    };
}
```