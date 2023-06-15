# React

## 核心概念

React 有个 UI = f(data) 公式：UI是由 data 推导出来的，所以在写应用的时候，我们只需要关心数据的改变，只需  data ---> data'， 那么 UI ---> UI' ，在这个过程中，我们其实并不关心UI是怎么变化到UI‘的（即`DOM`的变化），这部分工作是`React`替我们处理了

那么`React`是如何知道当数据变化的时候，需要修改哪些`DOM`的呢？最简单暴力的是，每次都重新构建整个DOM树。实际上，React 使用的是一种叫 `virtual-dom` 的技术：用JS对象来表示DOM结构，通过比较前后JS对象的差异，来获得DOM树的 增量修改。`virtual-dom` 通过 diff 计算，大大减少了DOM操作，让`UI = f(data)`这种模型性能不是那么的慢，当然你用原生`JS/jquery`直接操作DOM永远是最快的