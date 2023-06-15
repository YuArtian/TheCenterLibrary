---
description: 以 V8 引擎为例，说明 JS 是如何从 源码 到 执行的
---

# 编译原理

## 总览

JS 引擎是用来执行 JS 代码的。那到底代码是如何被执行的呢，JS引擎又是如何工作的呢

以 Chrome V8 引擎 为例子，它的工作流程图大致如下：

![V8&#x5F15;&#x64CE;&#x5DE5;&#x4F5C;&#x6D41;&#x7A0B;](https://github.com/YuArtian/yuartian.github.io/blob/master/.gitbook/assets/v8-gong-zuo-liu-cheng.jpg?raw=true)

## TL;DR

V8 执行一段 JavaScript 代码所经历的主要流程了，这包括了：

* [初始化基础环境](初始化基础环境.md)
* 解析源码生成 AST 和作用域
* 依据 AST 和作用域生成字节码
* 解释执行字节码
* 监听热点代码
* 优化热点代码为二进制的机器代码
* 反优化生成的二进制机器代码



