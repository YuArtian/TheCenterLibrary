# 前端路由

浏览器历史记录是 栈结构的（后进先出）

内部通过两个栈来管理历史记录：

- 浏览器当前显示的是第一个栈栈顶的地址

- 后退时，将第一个栈中栈顶的地址放入第二个栈中，此时，浏览器显示为新的栈顶的地址
- 前进时，就将第二个栈中栈顶的地址放入第一个栈中
- 如果中间，再次输入新的地址，则将新地址推入第一个栈，清空第二个栈，第二个栈中的历史记录就销毁了

## 哈希路由

`http://demo.com/#/aaa`

由于路由地址中的哈希值的改变不会刷新页面

利用 `window.location.hash = '/aaa'` 改变 hash 值

利用 `window.onhashchange = function(){...}` 事件可以监听 hash 值的变化，从而渲染对应路径的组件

问题是，显示在浏览器上的路径比较难看

## History API

> https://developer.mozilla.org/zh-CN/docs/Web/API/History

利用浏览器提供的 history api 创建虚拟路由地址，也不会刷新页面，但是在强制刷新的时候需要服务器配合

利用 `window.onpopstate` 监听路由的变化

### `window.history.pushState({}, null, 'aaa')`：

`pushState()` 需要三个参数: 一个状态对象, 一个标题 (目前被忽略), 和 (可选的) 一个URL

注意 `pushState()` 绝对不会触发 `hashchange` 事件，即使新的URL与旧的URL仅哈希不同也是如此

### `window.history.replaceState(stateObj, title[, url])`

修改了当前的历史记录项而不是新建一个

### `window.history.back()`

在会话历史记录中向后移动一页。如果没有上一页，则此方法调用不执行任何操作

### `window.history.forward()`

在会话历史中向前移动一页。它与使用`delta`参数为1时调用 `history.go(delta)`的效果相同

### `window.history.go(delta)`

`go()`方法从会话历史记录中加载特定页面。你可以使用它在历史记录中前后移动，具体取决于`delta`参数的值

- 负值表示向后移动，正值表示向前移动
- 如果未向该函数传参 或 `delta` 等于0，则该函数与调用`location.reload()`具有相同的效果

## 监听路由变化

> 多次设置相同的 hash 值，并不会多次触发 onpopstate 和 hashchange
>
> Histroy api 只会触发 onpopstate



### `window.onpopstate=function(event){//event.state}`

每当处于激活状态的历史记录条目发生变化时， `popstate` 事件就会在 **对应window** 对象上触发

**hash 值的改变也会引起 onpopstate 的变化**

其中的 `event.state` 就是 pushState 或者 replaceState 时设置的 state

### `window.onhashchange = function(){...}`

当 hash 变化的时候，onhashchange 才会发生变化

## Histroy 与 hash 模式相比的优点

在某种意义上，调用 `pushState()` 与 设置 `window.location = "#foo"` 类似，二者都会在当前页面创建并激活新的历史记录。但 `pushState()` 具有如下几条优点：

- 新的 URL 可以是与当前URL同源的任意URL 。相反，只有在修改哈希时，设置 `window.location` 才能是同一个 [`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)
- 如果你不想改URL，就不用改。相反，设置 `window.location = "#foo";`在当前哈希不是 `#foo` 时， 才能创建新的历史记录项
- 你可以将任意数据和新的历史记录项相关联。而基于哈希的方式，要把所有相关数据编码为短字符串 
- 如果 `标题` 随后还会被浏览器所用到，那么这个数据是可以被使用的（哈希则不是）