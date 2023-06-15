# v-model 是怎么实现的

> [https://ustbhuangyi.github.io/vue-analysis/v2/extend/v-model.html#%E8%A1%A8%E5%8D%95%E5%85%83%E7%B4%A0](https://ustbhuangyi.github.io/vue-analysis/v2/extend/v-model.html#表单元素)

v-model 指令 作用在 表单元素 和 组件 上

在表单上时，相当于

```html
<input
  v-bind:value="message"
  v-on:input="message = event.target.value"
/>
```

- 动态绑定了input 的 value 值到变量 message 上
- 在 input 事件触发的时候，动态设置 message 的值为输入的值

