# BFC（块格式化上下文）

BFC 可以简单的理解为**某个元素的一个 CSS 属性**，只不过这个属性**不能被开发者显式的修改**，拥有这个属性的元素对内部元素和外部元素会表现出一些特性，这就是BFC



下列方式会创建**块格式化上下文**：

- 根元素(``)
- 浮动元素（元素的 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 不是 `none`）
- 绝对定位元素（元素的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 为 `absolute` 或 `fixed`）
- 行内块元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `inline-block`）
- 表格单元格（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `table-cell`，HTML表格单元格默认为该值）
- 表格标题（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table-caption`，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `table、` `table-row`、 `table-row-group` 、 `table-header-group` 、 `table-footer-group`（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 `inline-table`）
- [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 值不为 `visible` 的块元素
- [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素
- [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content`或 paint 的元素
- 弹性元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `flex` 或 `inline-flex`元素的直接子元素）
- 网格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `grid` 或 `inline-grid` 元素的直接子元素）
- 多列容器（元素的 [`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-width) 不为 `auto`，包括  `column-count` 为 `1`）
- `column-span` 为 `all` 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（[标准变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51)，[Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362)）

块格式化上下文包含创建它的元素内部的所有内容.

块格式化上下文对浮动定位（参见 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float)）与清除浮动（参见 [`clear`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear)）都很重要

浮动定位和清除浮动时只会应用于同一个BFC内的元素。浮动不会影响其它BFC中元素的布局，而清除浮动只能清除同一BFC中在它前面的元素的浮动

外边距折叠（[Margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)）也只会发生在属于同一BFC的块级元素之间