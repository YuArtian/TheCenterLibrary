# Reflect

- 将 `Object` 对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上
  现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上
  也就是说，从`Reflect`对象上可以拿到语言内部的方法

- 修改某些 `Object` 方法的返回结果，让其变得更合理
  比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回 `false`
- 让`Object`操作都变成函数行为
  比如`name in obj`和`delete obj[name]`
  而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为
- `Reflect`对象的方法与`Proxy`对象的方法一一对应
  不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为





