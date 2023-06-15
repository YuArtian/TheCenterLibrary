# a标签能不能包含div

> https://juejin.im/post/5a2f2cb36fb9a0450b665899

因此 a标签内是否合可以包含div标签要看其父元素的 content model 和其内容的 categories

比如我们要看 p > ins > a > div 是否合法，过程是这样的：

- p 元素的 content model 是 phrasing content，ins 本身属于 phrasing content 故可以嵌套
- ins 元素的 content model 是 transparent，故在此时里面是否能有 a 需检查 p > a 的合法性
- a 元素也属于 phrasing content，故 p > ins > a 合法
- a 元素的 content model 也是 transparent，故此时里面包含 div 的合法性向上传递，检查 ins > div 又向上传递，变成检查 p > div
- div 不属于 phrasing content，所以这个嵌套是不合法的

