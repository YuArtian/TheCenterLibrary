# 说说对 TypeScript 中命名空间与模块的理解？区别？

> https://www.51cto.com/article/681918.html
> https://www.tslang.cn/docs/handbook/namespaces-and-modules.html
> https://typescript-eslint.io/rules/no-namespace/

namespace 就是一个普通对象
是位于全局命名空间下的一个普通的带有名字的 JavaScript 对象，使用起来十分容易
但就像其它的全局命名空间污染一样，它很难去识别组件之间的依赖关系，尤其是在大型的应用中

TypeScript 与ECMAScript 2015 一样，任何包含顶级 import 或者 export 的文件都被当成一个模块
相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的

现在已经不建议使用 namespace 了, eslint 会报错 （https://typescript-eslint.io/rules/no-namespace/）
改用 `declare module "XXX" {}` 代替