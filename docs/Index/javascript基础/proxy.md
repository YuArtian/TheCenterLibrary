# Proxy

在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

## 语法

```text
var proxy = new Proxy(target, handler);
```

```text
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
```

如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错

## Proxy 支持的拦截操作

一共 13 种拦截操作

- **get(target, propKey, receiver)**：拦截对象属性的读取
  比如 `proxy.foo` 和 `proxy['foo']`
- **set(target, propKey, value, receiver)**：拦截对象属性的设置
  比如 `proxy.foo = v `或 `proxy['foo'] = v`，返回一个布尔值
- **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值
- **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值
- **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组
  该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性
- **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
- **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值
- **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值
- **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象
- **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值
- **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值

如果目标对象是函数，那么还有两种额外操作可以拦截

- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作
  比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作
  比如`new proxy(...args)`

# Get

### 拦截读取

```javascript
let obj = {
  name: 'obj'
}
let proxy = new Proxy(obj, {
  get: function(target, propertyKey) {
    if(propertyKey in target) {
      return target[propertyKey]
    } else {
     	console.log('没找到')
    }
  }
})
proxy.name //name
proxy.age //'没找到'
```

### get 方法可以继承

### 实现一个生成所有 DOM 的函数

```
const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

document.body.appendChild(el);
```

# Set

利用`set`方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM

# Proxy.revocable

返回一个可取消的 Proxy 实例

```
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```

`Proxy.revocable`方法返回一个对象，该对象的`proxy`属性是`Proxy`实例，`revoke`属性是一个函数，可以取消`Proxy`实例。上面代码中，当执行`revoke`函数之后，再访问`Proxy`实例，就会抛出一个错误







