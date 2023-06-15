# Webpack

> https://juejin.im/post/5dc01199f265da4d12067ebe



**Compiler**类(`./lib/Compiler.js`)：webpack的主要引擎，在compiler对象记录了完整的webpack环境信息，在webpack从启动到结束，`compiler`只会生成一次。你可以在`compiler`对象上读取到`webpack config`信息，`outputPath`等

**Compilation**类(`./lib/Compilation.js`)：代表了一次单一的版本构建和生成资源。`compilation`编译作业可以多次执行，比如webpack工作在`watch`模式下，每次监测到源文件发生变化时，都会重新实例化一个`compilation`对象。一个`compilation`对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息



webpack 编译模块的基本流程：

1. 调用`webpack`函数接收`config`配置信息，并初始化`compiler`，在此期间会`apply`所有 webpack 内置的插件;
2. 调用`compiler.run`进入模块编译阶段；
3. 每一次新的编译都会实例化一个`compilation`对象，记录本次编译的基本信息；
4. 进入`make`阶段，即触发`compilation.hooks.make`钩子，从`entry`为入口： 
   1. 调用合适的`loader`对模块源码预处理，转换为标准的JS模块；
   2. 调用第三方插件`acorn`对标准 JS 模块进行分析，收集模块依赖项。同时也会继续递归每个依赖项，收集依赖项的依赖项信息，不断递归下去；
   3. 最终会得到一颗依赖树
5. 最后调用`compilation.seal` render 模块，整合各个依赖项，最后输出一个或多个chunk；





# 插件

DefinePlugin

> https://webpack.js.org/plugins/define-plugin/

DefinePlugin允许您创建可以在编译时配置的全局常量。这对于在开发版本和生产版本之间允许不同的行为很有用。如果在开发版本中而不是生产版本中执行日志记录，则可以使用全局常量来确定是否进行日志记录。那就是DefinePlugin发光的地方，进行设置并忘记它的开发和生产构建规则



