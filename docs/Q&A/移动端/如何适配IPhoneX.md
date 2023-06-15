# 如何适配IPhoneX

> 怎么解决 IPhone 的刘海屏，底部的小黑边，以及周围的圆角造成的样式问题

> 只要你做过 h5，必能碰到。。。

## TL;DR

1. `<meta name="viewport" content="width=device-width, viewport-fit=cover">`

2. ```css
   body {
     height: 100vh;
     box-sizing: border-box;
     padding-bottom: constant(safe-area-inset-bottom);
     padding-bottom: env(safe-area-inset-bottom);
   }
   ```

3. 样式隔离

   ```css
   @supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
     div {
       margin-bottom: constant(safe-area-inset-bottom);
       margin-bottom: env(safe-area-inset-bottom);
     }
   }
   ```

## 更多

<a href="../../知识库/CSS/IPhoneX适配">点击查看知识库</a>

## Tips

要注意 `box-sizing: border-box;` 的应用，一般来讲会设置 body 的高度为全屏

但是 `box-sizing` 的默认值是 `content-box`，边框和内边距的值并不计算在 height 内

想要不出现滚动条的话，还是要设置为 `border-box`