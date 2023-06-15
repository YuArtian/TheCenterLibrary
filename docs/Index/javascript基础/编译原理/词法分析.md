# 词法分析/分词（Scanner）

JS 文件只是一个源码（就是一堆字符串），机器是无法执行的，引擎会调用 Scanner 对源码进行词法分析

词法分析 就是把源码的字符串分割出来，生成一系列的 token，也就是 **词法单元（token）**

```text
var sum = 30;
// 词法分析后的结果
[
  "var" : "keyword",
  "sum" : "identifier",
  "="   : "assignment",
  "30"  : "integer",
  ";"   : "eos" (end of statement)
]
```



