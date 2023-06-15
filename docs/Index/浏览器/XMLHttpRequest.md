# XMLHttpRequest

> https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
>
> https://juejin.im/post/58e4a174ac502e006c1e18f4



AJAX、XMLHTTP、XMLHttpRequest详解、XMLHttpRequest Level 1、Level 2 详解

XHR 上传、下载数据、XHR 流式传输、XHR 定时轮询和长轮询区别与优缺点、XMLHttpRequest 库 (Mock.js、Zone.js、Oboe.js、fetch.js)

XMLHttpRequest 常用代码片段：

- ArrayBuffer 对象转字符串
- 字符串转 ArrayBuffer 对象
- 创建 XHR 对象
- sendAsBinary() polyfill
- 获取 XMLHttpRequest 响应体
- 获取 responseURL
- 验证请求是否成功
- 解析查询参数为Map对象
- XHR 下载图片
- XHR 上传图片
- XHR 上传进度条

分析 AJAX 请求状态为 0、GET请求方式为什么不能通过send() 方法发送请求体、简单请求和预请求、XMLHttpRequest 对象垃圾回收机制、Get与Post请求区别、如何避免重复发送请求、AJAX 站点 SEO 优化

## 封装XHR

```js
//封装全局请求
function xhrAdapter(type='GET', url, config={}){
  if (!url) return
  return new Promise((reslove, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(type, url, true)
    xhr.withCredentials = true
    xhr.timeout = 3000
    xhr.ontimeout = function(){
      console.log('timeout')
    }
    xhr.onreadystatechange = () => {
      if (!xhr || xhr.readyState !== 4) return
      if(xhr.status === 0) return
      const respone = {
        data: xhr.responseText,
        status: xhr.status,
        statusText: xhr.statusText
      }
      reslove(respone)
    }
    xhr.send()
  })
}
```



## readyState & onreadystatechange

- onreadystatechange:  Function - 当 readyState 属性改变时会调用它。
- readyState:  unsigned short - 用于表示请求的五种状态：

| 值   | 状态                            | 描述                                            |
| ---- | ------------------------------- | ----------------------------------------------- |
| 0    | UNSENT (未打开)                 | 表示已创建 XHR 对象，open() 方法还未被调用      |
| 1    | OPENED (未发送)                 | open() 方法已被成功调用，send() 方法还未被调用  |
| 2    | HEADERS_RECEIVED (已获取响应头) | send() 方法已经被调用，响应头和响应状态已经返回 |
| 3    | LOADING (正在下载响应体)        | 响应体下载中，responseText中已经获取了部分数据  |
| 4    | DONE (请求完成)                 | 整个请求过程已经完毕                            |

