# Props

> https://zhuanlan.zhihu.com/p/53218851



1、父组件 怎么传值给 子组件的 props

2、子组件如何读取props

3、父组件 data 更新，子组件的props 如何更新



```html
<div class="a" >
    <test :childName="parentName" ></test>
</div>
```

父组件 div 中有 子组件 test，并传递 childName 属性

## props初始化

基本流程：

1. 先执行父组件的创建过程，依次触发父组件beforeCreate，initState，created关键函数
2. 父组件 initState 时，初始化data，props等（详见4.子组件过程）
   调用defineReactive完成父组件data响应式，proxy代理data到父组件vm实例上
3. 之后，进入子组件创建过程，依次触发子组件beforeCreate，initState，created关键函数
4. 子组件 initState 时，开始初始化子组件自身data，props
5. 根据渲染函数 `{ attrs: { childName: parentVm.parentName } }`
   从父组件获取 parentVm.parentName 值
6. 父组件解析到的 props，写入propsOptions中，子组件initProp中接受 propsOptions
7. 子组件将 props 保存到 vm._props 上
8. for in循环 propsOptions：
   1. 缓存属性 key到 vm.$options._propKeys上，以便后续更新时使用
   2. 给每个属性（key）执行defineReactive，设置为响应式
   3. 将属性值代理到子组件 vm 实例上，方便开发时取props值
9. 子组件props初始化完成

#### 模板解析

模板解析过程中，要根据 AST 和 options 生成 render function（渲染函数）

```js
  function generate (
    ast,
    options
  ) {
    var state = new CodegenState(options);
    var code = ast ? genSSRElement(ast, state) : '_c("div")';
    return {
      render: ("with(this){return " + code + "}"),
      staticRenderFns: state.staticRenderFns
    }
  }
```

注意，这里使用了 with 来绑定作用域

所以，父组件被解析为

```js
(function() {    
  with(this){  
    return _c('div',{staticClass:"a"},[
      _c('test',{attrs:{"child-name":parentName}})
    ],1)
  }
})
```

1. _c 是渲染组件的函数，_c('test') 表示渲染 test 这个子组件

2. 因为 with 的作用是，绑定大括号内代码的 **变量访问作用域**

3. 这是一个匿名自执行函数，会在后面执行

#### Props 父传子

之后，模板函数会被执行，执行时会绑定 **父组件为作用域**

所以渲染函数内部所有的变量，**都会从父组件对象 上去获取**

绑定了父作用域之后， parentName 自然会从父组件获取

```js
{ attrs: { childName: parentVm.parentName } }
```

渲染函数执行的时候，内部的 **_c('test')** 执行，然后传入了赋值后的 **attrs**

父组件赋值之后的 attrs 就是下面这样

```js
{ attrs: { childName: "我是父组件" } }
```

此时，父组件就正式 利用 props 把 parentName 传给了子组件的props childName

#### 子组件保存props

props 会被保存到子组件实例的 **_props** 中

并且会逐一复制到子组件实例上，并且对每一个属性调用 defineReactive，设置为 **响应式** 的

之后再 调用 proxy 方法，进行 **访问转接** 和 **赋值转接**

## props取值

组件 props初始化 的时候，会把 props 逐一复制到 **vm对象**上（子组件的实例 this） 上

取值的时候，会触发之前被 proxy 方法设置的 get，代理到 this._props 上



## props更新

props的更新，正常流程要通过父组件的 data 的变化，触发 set代理

从而触发父组件 watcher 的重新渲染，对 props 重新赋值

并不建议，在子组件中直接修改 props，Vue框架会给出警告，但是子组件 props 的值还是可以更新的

但不影响 父组件中 data 的值，因为子组件的 props 被重新赋值了







