# Babel

> https://www.babeljs.cn/docs/

## Babel 是一个 JavaScript 编译器

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中

Babel 包含：@babel/core，@babel/cli，@babel/preset-env，@babel/polyfill

### @babel/core

> https://www.babeljs.cn/docs/babel-core

### @babel/cli

> https://www.babeljs.cn/docs/babel-cli

允许你以命令行的方式使用 babel 编译文件

```shell
npm install --save-dev @babel/core @babel/cli
babel script.js
```

还可以指定输出目录

```shell
npx babel script.js --out-file script-compiled.js
```

启用 watch 选项

```shell
npx babel script.js --watch --out-file script-compiled.js
```



## 常用
### @babel/plugin-proposal-optional-chaining

[@babel/plugin-proposal-optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
```js
const obj = {
  foo: {
    bar: {
      baz: 42,
    },
  },
};

const baz = obj?.foo?.bar?.baz; // 42

const safe = obj?.qux?.baz; // undefined

// Optional chaining and normal chaining can be intermixed
obj?.foo.bar?.baz; // Only access `foo` if `obj` exists, and `baz` if
                   // `bar` exists

// Example usage with bracket notation:
obj?.['foo']?.bar?.baz // 42
```

### @babel/plugin-proposal-class-properties
[@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)
```js
  class Bork {
    //Property initializer syntax
    instanceProperty = "bork";
    boundFunction = () => {
      return this.instanceProperty;
    };

    //Static class properties
    static staticProperty = "babelIsCool";
    static staticFunction = function() {
      return Bork.staticProperty;
    };
  }

  let myBork = new Bork;

  //Property initializers are not on the prototype.
  console.log(myBork.__proto__.boundFunction); // > undefined

  //Bound functions are bound to the class instance.
  console.log(myBork.boundFunction.call(undefined)); // > "bork"

  //Static function exists on the class.
  console.log(Bork.staticFunction()); // > "babelIsCool"
```
