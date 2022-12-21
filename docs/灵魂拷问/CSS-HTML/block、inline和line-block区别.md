# block、inline和line-block区别

> https://juejin.im/post/5a2f2cb36fb9a0450b665899 元素分类
>
> https://www.cnblogs.com/keithwang/p/3139517.html



block 为块级元素

- 独占一行，可以设置宽高、margin、padding、border
- 可以包含其他块级元素或者行内元素	

inline 为行内元素

- 行内元素宽度取决于内容宽度，高度受 line-height 影响，设置宽高没有效果
- 在同一行水平渲染
- margin和padding的上下无效

Inline-block

- 简单来说就是将元素呈现为inline元素，但是元素的内容作为block对象呈现。之后的内联对象会被排列在同一行内
- 比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性



