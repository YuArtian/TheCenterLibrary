# 尾调用和尾递归

## 尾调用（Tail Call）

尾调用是指 a 函数的最后一步是调用 b 函数，而且没有其他操作，b 函数中也没有引用到 a 函数中的变量

尾调用之所以与其他调用不同，就在于它的特殊的调用位置

函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数`A`的内部调用函数`B`，那么在`A`的调用帧上方，还会形成一个`B`的调用帧。等到`B`运行结束，将结果返回到`A`，`B`的调用帧才会消失。如果函数`B`内部还调用函数`C`，那就还有一个`C`的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了

也就是说，尾调用中，只有一个调用帧

注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”

支持 尾调用优化 的浏览器还不够多，貌似只有 Safari

## 尾递归

函数调用自身，称为递归。如果尾调用自身，就称为尾递归

递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）

但对于尾递归来说，由于可以进行 尾调用优化，只存在一个调用帧

所以永远不会发生 栈溢出 错误

ES6 严格模式下，尾递归优化才生效

### 递归函数改写

尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身

做到这一点的方法，就是把所有用到的内部变量改写成函数的参数

有两种方法可以改写现有的递归函数

```text
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时
```

#### 增加函数

```text
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial(n) {
  return tailFactorial(n, 1);
}

factorial(5) // 120
```

#### ES6 函数默认值

```text
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) // 120
```

#### 严格模式 <a id="&#x4E25;&#x683C;&#x6A21;&#x5F0F;"></a>

ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

* `func.arguments`：返回调用时函数的参数。
* `func.caller`：返回调用当前函数的那个函数

## 尾递归优化实现

没有尾递归的时候，可以用 循环 来解决递归爆栈的问题

`sum`是一个递归函数，参数`x`是需要累加的值，参数`y`控制递归次数。一旦指定`sum`递归 100000 次，就会报错，提示超出调用栈的最大次数

```text
function sum(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1);
  } else {
    return x;
  }
}

sum(1, 100000)
// Uncaught RangeError: Maximum call stack size exceeded(…)
```

### 蹦床函数（trampoline）

```text
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
// sum 也需要更改
function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}

trampoline(sum(1, 100000)) // 100001
```

### 真正的尾递归优化

```text
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 100000)
// 100001
```





