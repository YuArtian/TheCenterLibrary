# Vue

> [https://lq782655835.github.io/blogs/vue/vue-code-0.frame.html#%E6%A0%B8%E5%BF%83%E5%86%85%E5%AE%B9](https://lq782655835.github.io/blogs/vue/vue-code-0.frame.html#核心内容)



# 数据驱动

Vue.js 一个核心思想是数据驱动

所谓数据驱动，是指视图是由数据驱动生成的，我们对视图的修改，不会直接操作 DOM，而是通过修改数据

它相比我们传统的前端开发，如使用 jQuery 等前端库直接修改 DOM，大大简化了代码量

特别是当交互复杂的时候，只关心数据的修改会让代码的逻辑变的非常清晰，因为 DOM 变成了数据的映射，我们所有的逻辑都是对数据的修改，而不用碰触 DOM，这样的代码非常利于维护

# 响应式

修改 Vue 中的数据模型，视图就会随之更新

![](https://github.com/YuArtian/yuartian.github.io/blob/book/.gitbook/assets/vue%E5%93%8D%E5%BA%94%E5%BC%8F%E6%B5%81%E7%A8%8B.jpeg?raw=true)

### [双向绑定实现](./双向绑定实现.md)

### [如何更新props](./props.md)



