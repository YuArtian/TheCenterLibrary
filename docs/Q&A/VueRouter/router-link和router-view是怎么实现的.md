# router-link和router-view是怎么实现的

router-link 和 router-view 都是 VueRouter 注册的全局组件

## router-link

router-link 默认会渲染成 a标签，使用插槽将子组件包裹

指定 a标签 上的 click 方法为 \$router.push(to)，从而改变路由

设置的链接激活的时候，会设置 active-class CSS 类名，默认是包含匹配，可以用 exact 设置精确匹配

## router-view

router-view 实现为函数式组件，用来渲染路径匹配到的视图组件

router-view 渲染的组件还可以内嵌自己的 router-view，会根据嵌套的路径，渲染嵌套组件

