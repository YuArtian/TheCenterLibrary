## 函数是一等公民

JavaScript 中的函数非常灵活，其根本原因在于 JavaScript 中的函数就是一种特殊的对象，我们把 JavaScript 中的函数称为一等公民 \(First Class Function\)

函数可以赋值给一个变量，也可以作为函数的参数，还可以作为函数的返回值。如果某个编程语言的函数，可以和这个语言的数据类型做一样的事情，我们就把这个语言中的函数称为一等公民

## 函数的本质

在 JavaScript 中，函数是一种特殊的对象

* 函数作为一个对象，它有自己的属性和值，所以函数关联了基础的属性和值
* 函数之所以称为特殊的对象，这个特殊的地方是函数可以 被调用
* 一个函数被调用时，它还需要关联相关的 执行上下文

### 可调用

为函数对象添加了两个隐藏属性 name 和 code

name 标识函数名，匿名函数为 anonymous

code 表示函数代码，以字符串的形式存储在内存中

当执行到一个函数调用语句时，V8 便会从函数对象中取出 code 属性值，也就是函数代码，然后再解释执行这段函数代码，这就实现了函数可以调用的特性

### 可继承

函数提供 prototype 属性，用于实现基于原型链的继承

## 函数的定义

#### 函数声明

```text
function name () {}
```

函数声明属于 语句，语句会被提升而且函数是整体提升

函数声明一定要有函数名，否则会报错

#### 函数表达式

```text
var foo = function (){
    console.log('foo')
}
```

函数表达式属于 表达式，function 函数部分 不会参与 变量提升

#### Function 构造函数

```text
new Function ([arg1[, arg2[, ...argN]],] functionBody)
```

#### [箭头函数](箭头函数.md)

 ES6 允许使用“箭头”（`=>`）定义函数

### 函数声明与函数表达式

```text
foo() // 'foo'
function foo(){
    console.log('foo')
}
```

```text
foo() //Uncaught TypeError: foo is not a function
var foo = function (){
    console.log('foo')
}
```

当执行这段代码的时候，V8 在编译阶段会先查找声明语句，你可以把这段代码拆分为下面两行代码：

```text
var foo = undefined
foo = function (){
    console.log('foo')
}
```

第一行是声明语句，所以 V8 在解析阶段，就会在作用域中创建该对象，并将该对象设置为 undefined

第二行是函数表达式，在编译阶段，V8 并不会处理 函数表达式

所以也就不会将该函数表达式提升到作用域中了

那么在函数表达式之前调用该函数 foo，此时的 foo 只是指向了 undefined，所以就相当于调用一个 undefined，而 undefined 只是一个原生对象，并不是函数，所以当然会报错了

## 函数的参数

### 默认值

#### 默认值配合结构的写法

```text
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
```

```text
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```

#### null 不会触发参数默认值

```text
function foo(x = 5, y = 6) {
  console.log(x, y);
}

foo(undefined, null)
// 5 null
```

 上面代码中，`x`参数对应`undefined`，结果触发了默认值，`y`参数等于`null`，就没有触发默认值

#### 函数 length 属性不再准确

 指定了默认值以后，函数的`length`属性，将返回没有指定默认值的参数个数

也就是说，指定了默认值后，`length`属性将失真

```text
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```

#### 参数作用域

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域

等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的

```text
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2
```

 上面代码中，参数`y`的默认值等于变量`x`。调用函数`f`时，参数形成一个单独的作用域。在这个作用域里面，默认值变量`x`指向第一个参数`x`，而不是全局变量`x`，所以输出是`2`。

```text
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1
```

上面代码中，函数`f`调用时，参数`y = x`形成一个单独的作用域。这个作用域里面，变量`x`本身没有定义，所以指向外层的全局变量`x`。函数调用时，函数体内部的局部变量`x`影响不到默认值变量`x`。

如果此时，全局变量`x`不存在，就会报错





