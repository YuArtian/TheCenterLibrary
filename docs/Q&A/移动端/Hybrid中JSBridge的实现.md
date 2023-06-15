# Hybrid中JSBridge的实现

> https://juejin.im/post/5a537686f265da3e4674ec7a
>
> https://juejin.im/post/5aa00a28f265da2374108872
>
> https://segmentfault.com/a/1190000010356403



## 通信方式

### JS调用Native

#### 1.url拦截/假跳转

> 假跳转的请求归根结底是一种模拟跳转，跳转这件事情上webview会有限制
>
> 当JS连续发送多条跳转的时候，webview会直接过滤掉后发的跳转请求
>
> 可以采用延时发送消息 或者 消息队列+定时清空队列 的方式解决
>
> url 的长度有限制，过长会导致后面的信息丢失

##### location.href

```js
//发第一条消息
location.href = 'wakaka://wahahalalala/callNativeNslog?param=1111'

//延时发送第二条消息
setTimeout(500,function(){
    location.href = 'wakaka://wahahalalala/callNativeNslog?param=2222'
})
```

##### a标签跳转

##### iframe跳转

```js
//在JS中创建一个iframe，然后插入dom之中进行跳转
messagingIframe = document.createElement('iframe');
messagingIframe.style.display = 'none';
messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
document.documentElement.appendChild(messagingIframe);
```

#### 2.弹窗拦截

#### 3.JS上下文注入

##### （IOS）UIWebView 的 JSContext 注入

- 支持同步返回
- 支持直接传递对象，无需通过字符串序列化
- 要注意注入时机
- 只支持UIWebView

##### （IOS）WKWebView 的 messageHandler 注入

通过 `webkit.messageHandlers.xxx.postMessage()` 调用

##### （安卓）addJavascriptInterface 注入

原理机制几乎和UIWebView的JSContext注入一样，而且不需要考虑注入时机

### Native 调用 JS

#### evaluatingJavaScript

evaluatingJavaScript是一个非常非常通用普遍的方式了，原因也在介绍里解释过，js的脚本引擎天然支持，直接扔字符串进去，当做js代码开始执行

#### loadUrl

## 对比

### JS主动调用Native的方案

| 通信方案           |     版本支持      | 丢消息 | 支持同步返回 | 传递对象 | 注入原生对象 | 数据长度限制 |
| ------------------ | :---------------: | -----: | -----------: | -------: | -----------: | -----------: |
| 假跳转             |   全版本全平台    | 会丢失 |       不支持 |   不支持 |       不支持 |       有限制 |
| 弹窗拦截           |  UIWebView不支持  | 不丢失 |         支持 |   不支持 |       不支持 |       无限制 |
| JSContext注入      | 只有UIWebView支持 | 不丢失 |         支持 |     支持 |         支持 |       无限制 |
| 安卓interface注入  |    安卓全版本     | 不丢失 |         支持 |     支持 |         支持 |       无限制 |
| MessageHandler注入 | 只有WKWebView支持 | 不丢失 |       不支持 |   不支持 |       不支持 |       无限制 |

### Native主动调用JS的方案

- iOS: evaluatingJavaScript
- 安卓: 其实2个区别不大，使用方法差异也不大
  - 4.4以上 evaluatingJavaScript
- 4.4以下 loadUrl

## 实现

### JS 调用 Native

#### 封装消息对象

```js
var msgBody = {};
msgBody.handler = 'common';
msgBody.action = 'nativeLog';
msgBody.params = params; //任意json对象，用于传参
//对每一次消息需要发起回调都会生成一个唯一ID，用来当回调发生时，找到最初的发起调用的 JS Callback
msgBody.callbackId = '';
//客户端主动 Call JS 的唯一函数入口，客户端会用这个字符串来拼接回调注入的 JS 头，一般设计下，每个消息这个值都应该不变，不过也可以灵活处理
//本来这个值可以不需要传递，写死在客户端，只要前端客户端约定好，但如果这个值不写死，而由前端可控操作，那么灵活性会更大，不必担心前端大规模修改 Call JS 唯一入口的时候，还得等客户端发版
msgBody.callbackFunction = '';
```

#### 抽象消息发送层，隔离平台差异

```js
sendMessage: function (data, callback) {
  if (callback && typeof (callback) === 'function') {
    var callbackid = this.getNextCallbackID();
    this.msgCallbackMap[callbackid] = callback;
    data.callbackId = callbackid;
    //统一的全局回调处理函数
    data.callbackFunction = 'window.callbackDispatcher';
  }
  if (this.isIOS) {
    try {
      window.webkit.messageHandlers.WKJSBridge.postMessage(data);
    }
    catch (error) {
      console.log('error native message');
    }
  }

  if (this.isAndroid) {
    try {
      prompt(JSON.stringify([data]));
    }
    catch (error) {
      console.log('error native message');
    }
  }
}
sendMessage(msgBody,function(result){
  console.log('回调触发');
});
```

#### 回调处理

每个回调都有 callbackId，注册在 this.msgCallbackMap[callbackId] = callback 上，这样当 OC 发起回调的时候，你才能找到对应的 JS Function

客户端会把 callbackId callbackFuction ResultString 拼接成如下 JS 代码，注入回 WebView

```js
window.callbackDispatcher('12345callbackid','{\'result\':\'result\'}');
```

前端要做的就是准备好对应的函数，在window的对象上，挂上 callbackDispatcher 这个函数

客户端用这个字符串，拼出了 JS 代码，这个 JS 代码执行的时候，就刚好window下有这么一个函数接着

```js
window.callbackDispatcher: function (callbackId, resultjson) {
  var handler = this.msgCallbackMap[callbackId];
  if (handler && typeof (handler) === 'function') {
    // JSON.parse(resultjson)
    console.log(resultjson);
    var resultObj = resultjson ? JSON.parse(resultjson) : {};
    handler(resultObj);
  }
},
```

### Native 调用 JS

#### js 监听 native 的主动消息

```js
//监听的API
window.onListenEvent: function (eventId, handler) {
    var handlerArr = this.eventCallMap[eventId];
    if (handlerArr === undefined) {
        handlerArr = [];
        this.eventCallMap[eventId] = handlerArr;
    }
    if (handler !== undefined) {
        handlerArr.push(handler);
    }
},
```

```js
//业务调用该API
window.onListenEvent('applicationEnterBackground', function () {
   console.log('home press')
});
```

#### 接收 Native 消息

```js
//接收OC事件的API
window.eventDispatcher: function (eventId, resultjson) {
  var handlerArr = this.eventCallMap[eventId];
  for (var key in handlerArr) {
    if (handlerArr.hasOwnProperty(key)) {
      var handler = handlerArr[key];
      if (handler && typeof (handler) === 'function') {
        var resultObj = resultjson ? JSON.parse(resultjson) : {};
        var returnData = handler(resultObj);
        //多写一个return
        return returnData;
      }
    }
  }
},
```









