# 有用过fetch和XHR么？平时是怎么封装异步请求的，讲一下区别？

## 相关问题

>

## 知识库

[**fetch的介绍和封装**](../../知识库/浏览器/fetch.md)

Promise

[**XHR的介绍和封装**](../../知识库/浏览器/XMLHttpRequest.md)

EventTarget

## 30s核心讲述

fetch 和 XHR 都有使用过，也封装过。以前的 Ajax 主要就是基于 XHR 实现的，XHR 分为 level1 和 level2，level2 支持更多的特性，比如跨域、进度 和 二进制格式

XHR 的书写和封装比较麻烦，而且每个项目都需要进行重复同样的封装。也可以使用 JQuery 封装好的 ajax 方法

XHR 的兼容性非常好，也提供了 timeout，abort，进度等特性，不过都是用异步回调的方式，不用 Promise 封装的话容易产生回调地狱。现在都会结合 Promise 和 async/await 使用。用 Promise 包装，在回调函数中使用 reject/resolve 改变状态

fetch 则是 HTML5 的API，用来代替使用麻烦的 XHR 技术，默认返回 Promise，支持各种数据格式，没有回调的问题，可以结合 async/await 一起使用

不过，不支持 ie 以及一些超低版本的浏览器，没有 timeout 机制，需要自己用 Promise.race 模拟实现，完全不支持进度

abort 特性对应 AbortController & AbortSignal，同样的兼容性问题

fetch 的封装比较简单，主要是要注意响应状态码的判断，只有在网络错误时 fetch 才会被 reject

成功的 fetch() 检查不仅要包括 Promise 被 resolve，还要包括 Response.ok 属性为 true

fetch 并不认为 404 是一个失败的请求

## 展开

### 区别

#### 不同的实现方式

##### Fetch API 和 fetch

我们所说的 fetch 是基于 Fetch API 的实现

Fetch API 是一个 HTML5 的 API，是一个被用来取代 XHR 的新技术标准。它提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的一些具体部分，例如请求和响应

它实现了如下几个接口：

- [全局 fetch() 方法 (WorkerOrGlobalScope.fetch)](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch)，该方法提供了一种简单，合理的方式来跨网络异步获取资源
- [Headers](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers) 相当于 response/request 的头信息，可以使你查询到这些头信息，或者针对不同的结果做不同的操作
- [Request](https://developer.mozilla.org/zh-CN/docs/Web/API/Request) 相当于一个资源请求
- [Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 相当于一个资源响应
- [Body](https://developer.mozilla.org/zh-CN/docs/Web/API/Body) 提供了与 response/request 中的 body 有关的方法，可以定义它的内容形式以及处理方式

fetch 方法 是 Fetch API 在全局对象(Window)和Worker上的实现，实际上是 mixin 了 WorkerOrGlobalScope 这个实现

这意味着基本在任何场景下只要你想获取资源，都可以使用位于 WorkerOrGlobalScope 中的 fetch 方法

平时调用的 window.fetch()/fetch() 方法，实际上执行的是 WorkerOrGlobalScope.fetch()

fetch 构造一个 Request 对象用于发起请求，返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 Response 对象

##### XHR

XMLHttpRequest 是一个构造函数，使用时必须先调用 new XMLHttpRequest() 生成实例对象，才能访问其中的方法和属性

XMLHttpRequest 基于 EventTarget 实现了 XMLHttpRequestEventTarget，用来处理 XMLHttpRequest 实例上发生的事件

本质上是基于事件的发布订阅模式，使用异步回调的方式来告知执行结果

#### 不同的使用方式

- XHR 采用的是异步回调的方式，就是在写不同的回调函数，不用 Promise 的话，会有回调地狱的情况

  XHR 发送请求需要经历 open，send 方法，fetch 方法直接调用传入 url 就可以了

  fetch 返回 Promise，方便书写。Promise 本身也解决了回调的问题

- XHR 的响应结果是 XMLHttpRequest.response，类型取决于 responseType 的值，XHR 将会返回对应的值

  你需要确保服务器所返回的类型和你所设置的返回值类型是兼容的。那么如果两者类型不兼容呢?恭喜你，你会发现服务器返回的数据变成了null，即使服务器返回了数据

  responseType 要在调用 open() 初始化请求之后调用，并且要在调用 send() 发送请求到服务器之前调用

  fetch 的响应结果 Response 对象，需要调用对应的方法进行**读取**，比如 res.json() 返回一个被解析为 JSON 格式的 Promise 对象。不对应的格式会导致读取错误，Promise 走入 Reject

- fetch 提供 response.ok 属性，表明响应是否成功（状态码在200-299范围内）
  XHR 则需要自己判断 XMLHttpRequest.status


### 兼容性

XHR 支持几乎所有浏览器 ==> [caniuse](https://caniuse.com/#search=XMLHttpRequest)

fetch 不支持 ie 和 edge12-15 以及其他低版本的浏览器 ==> [caniuse](https://caniuse.com/#search=fetch)

###

