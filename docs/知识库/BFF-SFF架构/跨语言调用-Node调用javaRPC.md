# Node调用Java RPC

## 跨语言调用

解决跨语言调用的思路无非是两种：

- 寻找一个通用的协议
- 使用 agent 完成协议的适配

目前业界经常被提及的解决方案有如下几种，不妨拿出来老生常谈一番：

- spring cloud。spring cloud 提供了一整套微服务开发组件，它主要面向 java 开发，但由于其使用的协议是基于 restful 风格的 http 协议，这使得其天然具备跨语言能力，异构语言只需要提供 http 客户端，便可以实现跨语言调用。

- service mesh。号称下一代微服务框架的 service mesh，其解决跨语言问题的核心在于 SideCar ，SideCar 在 service mesh 的发展过程中概念不断的迁移，但本质都是完成了一件事：处理服务间通信，负责实现请求的可靠传递。

- motan。[motan](https://github.com/weibocom/motan) 是新浪微博开源的一款跨语言服务治理框架，在其早期版本中仅支持 motan-java，随着版本演进，在目前最新版本(1.1.0)中，提供了 motan-go，motan-php，motan-openresty 等跨语言特性。类似于 service mesh 中的 SideCar，motan 借助于 motan-go 作为 agent 完成协议的转发，并且依赖于定制协议：motan2，实现跨语言调用。

  

# Node通过dubbo2.js调用java dubbo服务(rpc)

> https://github.com/apache/dubbo-js
>
> https://github.com/node-modules/hessian.js
>
> https://github.com/node-modules/js-to-java



> https://juejin.cn/post/6882184522159849485
>
> https://dubbo.apache.org/zh/docs/
>
> https://juejin.cn/post/6844903811815849992
>
> https://dubbo.apache.org/zh/blog/2018/08/14/%E4%BB%8E%E8%B7%A8%E8%AF%AD%E8%A8%80%E8%B0%83%E7%94%A8%E5%88%B0dubbo2.js/



#### Dubbo协议报文格式

![dubbo协议](https://dubbo.apache.org/imgs/blog/dubbo-protocol.png)

协议报文最终都会变成字节，使用 tcp 传输，任何语言只要支持网络模块，有类似 Socket 之类的封装，那么通信就不成问题。那，跨语言难在哪儿？以其他语言调用 java 来说，主要有两个难点：

1. 异构语言如何表示 java 中的数据类型，特别是动态语言，可能不存在严格的数据类型
2. 序列化方案如何做到跨语言

#### dubbo2.js解决方案

上面我们分析出了两个难点，dubbo2.js 解决这两个问题的关键依赖于两个类库：[js-to-java](https://github.com/node-modules/js-to-java)，[hessian.js](https://github.com/node-modules/hessian.js) 

- js-to-java 使得 nodejs 具备 java 对象的表达能力

- hessian.js 提供了序列化能力

- 借助于 nodejs 的 socket ，复制一套 dubbo 协议的报文格式

最终便实现了 nodejs 对 java-dubbo-provider 的调用

### 快速入门

> https://dubbo.apache.org/zh/blog/2018/08/14/%E4%BB%8E%E8%B7%A8%E8%AF%AD%E8%A8%80%E8%B0%83%E7%94%A8%E5%88%B0dubbo2.js/#dubbo2js%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8

### dubbo2.js特性

- 支持 zookeeper 注册中心
- 支持原生 dubbo 协议
- 支持服务直连
- 全链路跟踪
- dubbo 接口自动生成

### 和 Eggjs 结合

> https://www.jianshu.com/p/9a4745bb9564