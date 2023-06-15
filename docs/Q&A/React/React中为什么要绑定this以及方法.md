# React中为什么要绑定this以及方法

> https://juejin.im/post/5b13c3a16fb9a01e75462a64
>
> https://juejin.im/post/5afa6e2f6fb9a07aa2137f51
>
> https://babeljs.io/docs/en/babel-plugin-transform-class-properties/
>
> https://zhuanlan.zhihu.com/p/27713910



React 在之前的版本中的 createClass API 中就自动绑定了 this

但是之后采用 ES6 class 创建组件的方式之后，只会在 React 提供的 API（生命周期）中，自动绑定 this

但是，用户自定义的事件是不会自动绑定的，因为 React 并不能确定是否真的需要绑定

this 值为 undefined 也是因为 class 中默认使用严格模式，以及 this 的指向的特性造成的



现在一般绑定的方法要使用 babel 的 babel-plugin-transform-class-properties

以便在 class 中以属性名和箭头函数相结合的方法，绑定 this 到组件实例







