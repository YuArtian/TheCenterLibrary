# shouldComponentUpdate和PurComponent区别

> https://imweb.io/topic/598973c2c72aa8db35d2e291
>
> https://zhuanlan.zhihu.com/p/94618828



PurComponent 中也是通过实现 shouldComponentUpdate 来做渲染判断

只不过 PurComponent 中判断的方法为 浅比较，不能对嵌套的对象做准确的判断



