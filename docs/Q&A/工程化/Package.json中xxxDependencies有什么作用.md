# Package.json中xxxDependencies有什么作用

npm 设计了以下几种依赖类型声明：

- dependencies 项目依赖

- devDependencies 开发依赖

- peerDependencies 同版本依赖

- bundledDependencies 捆绑依赖

- optionalDependencies 可选依赖



它们起到的作用和声明意义各不相同：

- **dependencies 表示项目依赖，这些依赖都会成为线上生产环境中的代码组成部分**。当它关联的 npm 包被下载时，dependencies 下的模块也会作为依赖，一起被下载



- **devDependencies 表示开发依赖，不会被自动下载**，因为 devDependencies 一般只在开发阶段起作用或只是在开发环境中需要用到。比如 Webpack，预处理器 babel-loader、scss-loader，测试工具 E2E、Chai 等，这些都是辅助开发的工具包，无须在生产环境使用
  这里需要特别说明的是：**并不是只有在 dependencies 中的模块才会被一起打包**，而在 devDependencies 中的依赖一定不会被打包。实际上，依赖是否被打包，完全取决于项目里是否被引入了该模块。dependencies 和 devDependencies 在业务中更多的只是一个规范作用，我们自己的应用项目中，使用 npm install 命令安装依赖时，dependencies 和 devDependencies 内容都会被下载。

- **peerDependencies 表示同版本依赖**，简单来说就是：如果你安装我，那么你最好也安装我对应的依赖举一个场景实例，对于插件类 (Plugin) 项目，比如我开发一个 Koa 中间件，很明显这类插件或组件脱离（Koa）本体是不能单独运行且毫无意义的，但是这类插件又无须声明对本体（Koa）的依赖声明，更好的方式是使用宿主项目中的本体（Koa）依赖。这就是peerDependencies 主要的使用场景。这类场景有以下特点：

  - 插件不能单独运行

  - 插件正确运行的前提是核心依赖库必须先下载安装

  - 我们不希望核心依赖库被重复下载

  - 插件 API 的设计必须要符合核心依赖库的插件编写规范

  - 在项目中，同一插件体系下，核心依赖库版本最好相同

- **bundledDependencies 和 npm pack 打包命令有关**

- optionalDependencies 表示可选依赖，就是说即使对应依赖项安装失败了，也不会影响整个安装过程。一般我们很少使用到它，这里我也不建议大家使用，因为它大概率会增加项目的不确定性和复杂性

