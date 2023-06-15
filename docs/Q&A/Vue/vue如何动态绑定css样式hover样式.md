# vue如何动态绑定css样式hover样式

> https://stackoverflow.com/questions/46551925/vuejs-v-bindstyle-hover

## TL;DR

利用 css 自定义属性（CSS 变量）（https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*）

和 css 函数 var（https://developer.mozilla.org/zh-CN/docs/Web/CSS/var）

利用 style 动态绑定，可以动态的设置自定义属性值。在 css 中利用 var 函数将CSS 变量应用到指定属性

## 实现步骤

1. 首先在style 绑定一个变量
   :style='styleObject'

2. 在computed写一个计算属性
   ```vue
   computed: {
     styleObject() {
        return {
         "--background-color": this.buttonColor,
         "--background-color-hover": this.buttonHover,
        };
     },
   }
   ```

   

3. data中定义buttonColor，buttonHover

4. 最后直接在css中用
   background-color: var(--background-color)
   :hover里面
   background-color:var(--background-color-hover)