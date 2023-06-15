# class 的底层实现

> https://github.com/logan70/Blog/issues/22

# ES6 Class的底层实现原理

> ES6 中的类`Class`，仅仅只是基于现有的原型继承的一种语法糖，我们一起来看一下`Class`的底层实现原理。

## Class的底层实现要素

1. 只能使用new操作符调用`Class`；
2. `Class`可定义实例属性方法和静态属性方法；
3. 子`Class`的实例可继承父`Class`上的实例属性方法、子`Class`可继承父`Class`上的静态属性方法。

### 只能使用new操作符调用`Class`

**实现思路**：�使用`instanceof`操作符检测实例是否为指定类的实例。

```js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
```

### 定义实例属性方法和静态属性方法

**实现思路**

- 在构造函数的原型上定义属性方法，即为实例属性方法；
- 在构造函数本身定义属性方法，即为静态属性方法

```js
function _createClass(Constructor, protoProps = [], staticProps = []) {
  // 在构造函数的原型上定义实例属性方法
  _defineProperties(Constructor.prototype, protoProps)
  // 在构造函数本身定义静态属性方法
  _defineProperties(Constructor, staticProps)
}

// 实现公用的批量给对象添加属性方法的方法
function _defineProperties(target, props) {
  props.forEach(prop => {
    Object.defineProperty(target, prop.key, prop)
  })
}
```

### 继承实例属性方法和静态属性方法

**实现思路**：借用原型链继承实现

```js
function _inherits(subClass, superClass) {
  // 子类实例继承父类的实例属性方法
  subClass.prototype = Object.create(superClass.prototype)
  // 修正constructor属性
  subClass.prototype.constructor = subClass

  // 子类继承父类的静态属性方法
  Object.setPrototypeOf(subClass, superClass)
}
```

## 模拟编译

了解了`Class`的底层实现要素，我们就来将`Class`模拟编译为使用原型继承实现的代码

### 源代码

```js
class Person {
  constructor(options) {
    this.name = options.name
    this.age = options.age
  }
  eat() {
    return 'eating'
  }
  static isPerson(instance) {
    return instance instanceof Person
  }
}

class Student extends Person {
  constructor(options) {
    super(options)
    this.grade = options.grade
  }
  study() {
    return 'studying'
  }
  static isStudent(instance) {
    return instance instanceof Student
  }
}
```

### 编译后代码

```js
var Person = (function() {
  function Person(options) {
    // 确保使用new调用
    _classCallCheck(this, Person)
    this.name = options.name
    this.age = options.age
  }

  _createClass(
    Person,
    // 实例属性方法
    [{
      key: 'eat',
      value: function eat() {
        return 'eating'
      }
    }],
    // 静态属性方法
    [{
      key: 'isPerson',
      value: function isPerson(instance) {
        return instance instanceof Person
      }
    }]
  )
  return Person
})();
var Student = (function (_Person) {
  // 继承父类实例属性方法和静态属性方法
  _inherits(Student, _Person)

  function Student(options) {
    // 确保使用new调用
    _classCallCheck(this, Student)

    // 执行父类构造函数
    _Person.call(this, options)

    this.grade = options.grade
  }

  _createClass(Student,
    // 实例属性方法
    [{
      key: 'study',
      value: function study() {
        return 'studying'
      }
    }],
    // 静态属性方法
    [{
      key: 'isStudent',
      value: function isStudent(instance) {
        return instance instanceof Student
      }
    }]
  )

  return Student
})(Person);
```

### 测试代码

```js
const person = new Person({ name: 'Logan', age: 18 })
const student = new Student({ name: 'Logan', age: 18, grade: 9 })

expect(person.eat()).toBe('eating')
expect(student.eat()).toBe('eating') // 继承实例方法
expect(student.study()).toBe('studying')

expect(Student.isStudent(student)).toBe(true)
expect(Person.isPerson(person)).toBe(true)
expect(Student.isStudent(person)).toBe(false)
expect(Student.isPerson(student)).toBe(true) // 继承静态方法
```