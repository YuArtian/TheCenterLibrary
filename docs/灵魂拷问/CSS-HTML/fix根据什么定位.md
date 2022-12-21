# fix 根据什么定位

> https://www.cnblogs.com/coco1s/p/7358830.html

position: fix 根据屏幕视窗（viewpoint）定位

fix 失效的情况，父元素上出现：

- transform 不为 none（Chrome、Safari）
- will-change 指定任意 CSS 属性（X）
- will-change 指定 transform（Chrome）
- perspective 不为 none（Chrome）

