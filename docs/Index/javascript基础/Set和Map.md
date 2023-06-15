# Set 和 Map

## Set

类似于数组，但是成员的值都是唯一的，没有重复的值

Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化

### 去重

#### 数组

```text
[...new Set(array)]
```

#### 字符串

```text
[...new Set[string]].join('')
```

### 判定

向 Set 加入值的时候，不会发生类型转换，所以`5`和`"5"`是两个不同的值

Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”

它类似于精确相等运算符（`===`），主要的区别是向 Set 加入值时认为`NaN`等于自身，而精确相等运算符认为`NaN`不等于自身

### 属性和方法

Set 结构的实例有以下属性

* `Set.prototype.constructor`：构造函数，默认就是`Set`函数
* `Set.prototype.size`：返回`Set`实例的成员总数

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）

#### 四个操作方法

* `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身
* `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功
* `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员
* `Set.prototype.clear()`：清除所有成员，没有返回值

#### 四个遍历方法

* `Set.prototype.keys()`：返回键名的遍历器
* `Set.prototype.values()`：返回键值的遍历器
* `Set.prototype.entries()`：返回键值对的遍历器
* `Set.prototype.forEach()`：使用回调函数遍历每个成员

`keys`方法、`values`方法、`entries`方法返回的都是遍历器对象，取值需要用 for...of 遍历

由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致

### 应用

可以直接用for...of循环遍历 Set

扩展运算符（`...`）内部使用`for...of`循环，所以也可以用于 Set 结构

Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

```text
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

## WeakSet

* WeakSet 的成员只能是对象，而不能是其他类型的值
* WeakSet 中的对象都是弱引用
* WeakSet 没有`size`属性，没有办法遍历它的成员 WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了
* WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏

## Map

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。为了解决这个问题，ES6 提供了 Map 数据结构

## WeakMap











