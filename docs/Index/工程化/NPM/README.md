# NPM

NPM（node package manager）node 包管理器

## 安装机制

> .npmrc 配置 npm 源，设置 registry 地址

1. 执行 `npm install`

2. 首先，检查并获取 npm 配置
   这里的优先级为：项目级的 .npmrc 文件 > 用户级的 .npmrc 文件> 全局级的 .npmrc 文件 > npm 内置的 .npmrc 文件

3. 检查项目中是否有 package-lock.json 文件

   - 如果有，则检查 package-lock.json 和 package.json 中声明的依赖是否一致：
     - 一致，直接使用 package-lock.json 中的信息，从缓存或网络资源中加载依赖；
     - 不一致，按照 npm 版本进行处理（不同 npm 版本处理会有不同，具体处理方式如图所示）。

   - 如果没有，则根据 package.json 递归构建依赖树
     然后按照构建好的依赖树下载完整的依赖资源，在下载时就会检查是否存在相关资源缓存：

     - 存在，则将缓存内容解压到 node_modules 中；
     - 不存在，就先从 npm 远程仓库下载包，校验包的完整性，并添加到缓存，同时解压到 node_modules。

     最后生成 package-lock.json

![npm安装流程](@img/npm_01.png)



## npm缓存机制

> 对于一个依赖包的同一版本进行本地化缓存，是当代依赖包管理工具的一个常见设计

### 文件位置

可以使用 `npm config get cache` 命令，查看缓存文件位置

默认存在 `./User/xx/.npm/_cacache` 文件中（Mac）

使用 ` npm cache clean --force` 清空缓存的文件

接下来打开`_cacache`文件，看看 npm 缓存了哪些东西，一共有 3 个目录：

- content-v2
- index-v5
- tmp

其中 content-v2 里面基本都是一些二进制文件。为了使这些二进制文件可读，我们把二进制文件的扩展名改为 .tgz，然后进行解压，得到的结果其实就是我们的 npm 包资源。

而 index-v5 文件中，我们采用跟刚刚一样的操作就可以获得一些描述性的文件，事实上这些内容就是 content-v2 里文件的索引。

## npx

用于执行npm包的二进制文件

 npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装

## 多源npm和私服部署

### 多源管理

npm 中的源（registry），其实就是一个查询服务

可以通过`npm config set`命令来设置安装源或者某个 `scope` 对应的安装源

[nrm](https://www.npmjs.com/package/nrm) 是常见的 npm 源管理工具，可以实现快速添加，切换源地址

### 私服部署

#### 必要

- 虽然 npm 并没有被屏蔽，但是下载第三方依赖包的速度依然较缓慢，这严重影响 CI/CD 流程或本地开发效率。部署镜像后，一般可以确保高速、稳定的 npm 服务
- 使发布私有模块更加安全
- 审核机制也可以保障私服上的 npm 模块质量和安全

#### 部署

现在社区上主要有 3 种工具来搭建 npm 私服：nexus、verdaccio 以及 cnpm

