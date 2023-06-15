# v-if和v-for优先级谁更高

```html
<div v-if="false" v-for="i in 3"></div>
```

结果：

会执行 v-for，3次循环中都会分别去判断 v-if

