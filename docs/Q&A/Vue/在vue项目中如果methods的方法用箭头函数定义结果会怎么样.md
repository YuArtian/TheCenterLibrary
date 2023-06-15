# 在vue项目中如果methods的方法用箭头函数定义结果会怎么样

因为箭头函数默绑定父级作用域的上下文，所以不会绑定vue实例，所以 this 是undefind

