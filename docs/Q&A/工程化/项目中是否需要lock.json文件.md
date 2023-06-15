# 项目中是否需要lock.json文件

>  为什么要 lockfiles，要不要提交 lockfiles 到仓库？

### 一个 package-lock.json 的 dependency 主要由以下部分构成。

Version：依赖包的版本号

Resolved：依赖包安装源（可简单理解为下载地址）

Integrity：表明包完整性的 Hash 值

Dev：表示该模块是否为顶级模块的开发依赖或者是一个的传递依赖关系

requires：依赖包所需要的所有依赖项，对应依赖包 package.json 里 dependencies 中的依赖项

dependencies：依赖包 node_modules 中依赖的包（特殊情况下才存在）

事实上，并不是所有的子依赖都有 dependencies 属性，只有子依赖的依赖和当前已安装在根目录的 node_modules 中的依赖冲突之后，才会有这个属性。这就涉及嵌套情况的依赖管理，我已经在前文做了说明。

### 要不要提交 lockfiles 到仓库？这就需要看项目定位决定了。

如果开发一个应用，我建议把 package-lock.json 文件提交到代码版本仓库。这样可以保证项目组成员、运维部署成员或者 CI 系统，在执行 npm install 后，能得到完全一致的依赖安装内容。

如果你的目标是开发一个给外部使用的库，那就要谨慎考虑了，因为库项目一般是被其他项目依赖的，在不使用 package-lock.json 的情况下，就可以复用主项目已经加载过的包，减少依赖重复和体积。

如果我们开发的库依赖了一个精确版本号的模块，那么提交 lockfiles 到仓库可能会造成同一个依赖不同版本都被下载的情况。如果作为库开发者，真的有使用某个特定版本依赖的需要，一个更好的方式是定义 peerDependencies。

因此，一个推荐的做法是：把 package-lock.json 一起提交到代码库中，不需要 ignore。但是执行 npm publish 命令，发布一个库的时候，它应该被忽略而不是直接发布出去。