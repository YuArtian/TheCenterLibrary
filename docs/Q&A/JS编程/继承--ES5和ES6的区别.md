# 继承--ES5和ES6的区别

> https://segmentfault.com/a/1190000014798678
>
> https://es6.ruanyifeng.com/#docs/class



```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```



ES6类的底层还是通过构造函数去创建的

- 通过ES6创建的类，是不允许你直接调用的，只能通过 new 使用
  ES6中抛出 `Class constructor Point cannot be invoked without 'new'` 错误
  在ES5中，构造函数是可以直接运行的

- ES6 class 中会有一个默认给出的`constructor`方法，这就是构造方法，不写的话也会默认添加一个空的
   其中 this 关键字代表实例对象，也就是说，ES5 的构造函数 `Point`，对应 ES6 的 `Point` 类的构造方法

- 定义“类”的方法的时候，前面不需要加上`function`这个关键字，直接把函数定义放进去了就可以了
  另外，方法之间不需要逗号分隔，加了会报错

- 类的内部所有定义的方法，都是不可枚举的（non-enumerable），ES5中则可以

- 严格模式
  类和模块的内部，默认就是严格模式，所以不需要使用`use strict`指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式

- 不存在变量提升
  类不存在变量提升（hoist），这一点与 ES5 完全不同

  也就是说 1. class要先定义再使用 2. 父类 必须要写在 子类前面
  
  eg：
  
  ```js
  new Foo() //ReferenceError
  class Foo {}
  ```
  
  ```js
  class Bar extends Foo {}//ReferenceError
  class Foo {}
  ```
  
  
  
  
  
  

