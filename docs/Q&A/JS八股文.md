# JS八股文

## 第1题

```js
var test = (function(i){
  return function(){
    alert(i*=2)
  }
})(2)
```

> 打印出 字符串 '4'
>
> 注意，alert() 会调用 toString()

## 第2题

```js
function Foo(){
  getName = function(){
    console.log('1')
  }
  return this
}

Foo.getName = function () {
  console.log('2')
}
Foo.prototype.getName = function () {
  console.log('3')
}

var getName = function () {
  console.log('4')
}
function getName () {
  console.log('5')
}

Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()
```

> 2 4 1 1 2 3 3
>
> 注意 [运算符优先级](../javascript基础/表达式和运算符/README.md#运算符优先级) 的问题
>
> 优先级 new() > . > new

## 第3题

```js
function A (){
  alert(1)
}
function Fn(){
  A=function(){
    alert(2)
  }
  return this
}
Fn.A = A
Fn.prototype = {
  A: () => {
    alert(3)
  }
}

A()
Fn.A()
Fn().A()
new Fn.A()
new Fn().A()
new new Fn().A()
```

> 1 1 2 1 3 Error A is not a constructor
>
> 注意箭头函数不能 new

## 第4题

```js
var x = 2
var y = {
  x: 3,
  z: (function(x){
    this.x*=x
    x+=2
    return function (n) {
      this.x*=n
      x+=3
      console.log('x',x)
    }
  })(x)
}
var m = y.z
m(4)
y.z(5)
console.log('x, y.x',x, y.x)
```

> x 7
> x 10
> x, y.x 16 15

## 第5题

```js
var x = 0
var y = 1
function fn () {
  x+=2
  fn = function (y) {
    console.log('y',y+(--x))
  }
  console.log('inner x,y',x,y)
}
fn(3)
fn(4)
console.log('outer x,y',x,y)
```

> inner 2 1
> y 5
> outer 1,1

## 第6题

```js
setTimeout(() => {
  console.log(1)
},20)
console.log(2)
setTimeout(() => {
  console.log(3)
},10)
console.log(4)
console.time('AA')
for(let i=0; i<90000000; i++){
  //do something
}
console.timeEnd('AA')
console.log(5)
setTimeout(() => {
  console.log(6)
},8)
console.log(7)
setTimeout(() => {
  console.log(8)
},15)
console.log(9)
```

> 2
> 4
> 'aa'
> 5
> 7
> 9
> 3
> 1
> 6
> 8

## 第7题

```js
var a = ?
    if (a == 1 && a == 2 && a == 3) {
      console.log('验证通过')
    }
```

对象转换为数字

##### Symbol.toPrimitive

```js
var a = {
  [Symbol.toPrimitive]: (function () {
    let i = 0
    return function (){
      return ++i
    }
  })()
}
```

##### valueOf

```js
var a = {
  valueOf: (function(){
    let i = 0
    return function(){
      return ++i
    }
  })()
}
```

##### toString

```js
var a = {
  i: 0,
  toString: function(){
    return ++this.i
  }
}
```

```js
var a = [1,2,3]
a.toSting = a.shift
```

##### Object.defineProperty

```js
let i = 0
Object.defineProperty(window, 'a',{
  get () {
    return ++i
  }
})
```

##### Proxy

```js
var a = new Proxy({i: 0}, {
  get: function(target, key){
    console.log(key)// Symbol(Symbol.toPrimitive)
    //隐式转换时，会使用Symbol.toPrimitive上的函数，所以这里应该要返回一个函数
    return () => target.i += 1
  }
})
```

## 第8题

```js
console.log(1 + "2" + "2");

console.log(1 + +"2" + "2");

console.log(1 + -"1" + "2");

console.log(+"1" + "1" + "2"); 

console.log( "A" - "B" + "2"); 

console.log( "A" - "B" + 2); 
```

> '122' '32' '02' '112' 'NaN2' NaN

## 第9题

```js
var a = 666;
console.log(++a);
console.log(a++);
console.log(a);
```

> 667
>
> 667
>
> 668
>
> 1）这里的`++`、`--`不能用作于常量。比如:
>
> ```js
> 1++; // 抛出错误
> ```
>
> 2）如果`a`不是数字类型,会首先通过`Number(a)`, 将`a`转换为数字。再执行`++`等运算

## 第10题

```js
console.log(typeof a);
function a() {}
var a;
console.log(typeof a);
```

> function
>
> function
>
> 函数会优先于变量声明提前。因此会忽略 var a

## 第11题

```js
var a;
var b = 'undefined';
console.log(typeof a);
console.log(typeof b);
console.log(typeof c);
```

> 'undefined'
>
> 'string'
>
> 'undefined'
>
> 注意 typeof 返回的是字符串类型

## 第12题

```js
var x = 1;
if(function f(){}){
    x += typeof f;
}
 
console.log(x);
```

> 1undefined
>
> function f(){} 当做 if 条件判断，其隐式转换后为 true
>
> 但是在 () 中的函数不会声明提升，所以函数在外部是不存在的
>
> 所以 typeof f === 'undefined'，所以 x += typeof f，相当于`x = x + 'undefined'`为 '1undefined'

## 第13题

```js
var str = "123abc";
console.log(typeof str++);
```

> "number"
>
> ++ 会将 str 转为 Number，typeof NaN === "number"

## 第14题

```js
console.log('b' + 'a' + +'a'+'a');
```

> "baNaNa"

## 第15题

```js
var obj = {n: 1};
function fn2(a) {
    a.n = 2;
}
fn2(obj);
console.log(obj.n);
```

> 2

## 第16题

```js
var x = 10;
function fn() {
    console.log(x);
}
function show(f) {
    var x = 20;
    f();
}
show(fn);
```

> 10
>
> 词法作用域，函数能访问到的变量取决于它所定义的位置，和函数调用的位置无关

## 第17题

```js
Object.prototype.bar = 1; 
var foo = {
    goo: undefined
};

console.log(foo.bar);
console.log('bar' in foo);

console.log(foo.hasOwnProperty('bar'));
console.log(foo.hasOwnProperty('goo'));
```

> 1
>
> true
>
> false
>
> true
>
> `in`操作符：检测指定对象(右边)原型链上是否有对应的属性值
>
> `hasOwnProperty`方法：检测指定对象自身上是否有对应的属性值

## 第18题

```js
Object.prototype.bar = 1;

var foo = {
    moo: 2
};
for(var i in foo) {
    console.log(i); 
}
```

> "moo"
>
> "bar"
>
> `for...in...`遍历对象上除了`Symbol`以外的可枚举属性,包括原型链上的属性

## 第19题

```js
function foo1() {
    return {
        bar: "hello"
    };
}
function foo2() {
    return 
    {
        bar: "hello"
    };
}
console.log(foo1());
console.log(foo2());
```

> {bar:"hello"}
>
> undefined
>
> 两个函数唯一区别就是`return`后面跟的值,一个换行一个不换行。
>
> 当我们书写代码时忘记在结尾书写`;`时,`JavaScript`解析器会根据一定规则自动补上`;`

## 第20题

```js
console.log((function(){ return typeof arguments; })());
```

> "object"

## 第21题

```js
console.log(Boolean(false));
console.log(Boolean('0'));
console.log(Boolean(''));
console.log(Boolean(NaN));
```

> false
>
> true
>
> false
>
> false
>
> 只有 +0，-0，NaN，false，''，null，undefined 才会被转换为 false

## 第22题

```js
console.log(Array(3));

console.log(Array(2,3));
```

> [,,,]
>
> [2,3]

## 第23题

```js
console.log(0.1 + 0.2 == 0.3)
```

> false
>
> 著名的精度丢失问题

## 第24题

```js
var a=[1, 2, 3];
console.log(a.join());
```

> "1,2,3"

## 第25题

```js
var a = [3];
var b = [1];
console.log(a - b); 
```

> 2
>
> 先调用 toString，转换为 "3" - "1"








