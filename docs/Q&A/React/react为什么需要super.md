# 为什么需要super

> https://overreacted.io/zh-hans/why-do-we-write-super-props/
>
> https://segmentfault.com/q/1010000008340434

### React 的组件必须要调用 super(props) 或者 super()，为什么？这两者有什么区别？



1. 调用super的原因：在ES6中，在子类的`constructor`中必须先调用`super`才能引用`this`

2. `super(props)`的目的：在`constructor`中可以使用`this.props`

3. 仅仅是 super() 的话在 constructor 中是不能使用 this.props 的，但是在其他位置还是可以使用的
   这是 React 处理的结果，React 将 props 赋值在实例上，以便仅在 render 中使用时可以省略 constructor

   ```js
   class HelloMessage extends React.Component{
     render (){
       return (
         <div>nice to meet you! {this.props.name}</div>
   		);
   	}
   }
   ```

   

4. 最后，可以看下[React文档](https://facebook.github.io/react/docs/state-and-lifecycle.html#adding-local-state-to-a-class)，里面有一段

> Class components should always call the base constructor with props.

