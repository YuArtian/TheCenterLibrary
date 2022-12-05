# webpack缓存原理
> https://webpack.docschina.org/configuration/cache/#root
> https://saber2pr.top/#/blog/%E5%89%8D%E7%AB%AF%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7/webpack/webpack%E7%BC%93%E5%AD%98%E5%8E%9F%E7%90%86
> https://mp.weixin.qq.com/s/sPb20xx-I64mifKa2N3YFQ
> https://github.com/webpack/changelog-v5/blob/master/guides/persistent-caching.md#opt-in
> https://segmentfault.com/a/1190000041726881

## TL;DR
在 cache 字段下完成有关持久化缓存的基本配置，当 type 为 fileSystem 时开启持久化缓存的能力
将构建结果持久化缓存到本地的磁盘，二次构建(非 watch 模块)时，直接利用磁盘缓存的结果
从而跳过构建过程当中的 resolve、build 等耗时的流程，从而大大提升编译构建的效率

```json
{
  type: 'fileSystem',
  buildDependencies: {
    config: [
      __filename,
      path.resolve(__dirname, '.browserslistrc'),
      path.resolve(__dirname, 'babel.config.js'),
      path.resolve(__dirname, 'vue.config.js'),
      path.resolve(__dirname, 'tsconfig.json'),
      path.resolve(__dirname, 'yarn.lock'),
      path.resolve(__dirname, 'package.json'),
      ...glob.sync('.env*').map((v) => path.resolve(__dirname, v)),
    ],
  },
}
```

## webpack5 cache 配置
默认在 dev 中是 memory， prod 环境不开启
在 cache 字段下完成有关持久化缓存的基本配置，当 type 为 fileSystem 时开启持久化缓存的能力(watch 模式下是分级缓存配合使用)，另外需要特别注意的是 buildDependencies 的配置，这个配置和整个构建流程的安全性有关。常见于和项目相关的一些配置信息，例如你是使用 @vue/cli 进行开发的项目，那么 vue.config.js 就需要作为项目的 buildDependencies，此外 webpack 在内部处理流程当中将所有的 loader 也作为了 buildDependenceis，一旦 buildDependencies 发生了变更，那么在编译流程的启动阶段便会导致整个缓存失效，进而走一遍新的构建流程

### type
默认为 'memory', 从内存中获取
type: 'fileSystem' 时开启持久化缓存
默认缓存存放路径为 ./node_modules/.cache/webpack，可以通过 cacheDirectory 修改


### buildDependencies



## 测试
vue create webpack-cache-vue-test
vue.config.js 配置中

```js
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    cache: {
      type: "filesystem",
      buildDependencies: {
        config: [__filename],
      },
    },
  },
});
```

### 空的 vue-cli 项目
第一次构建 Done in 9.96s
第二次构建 Done in 6.42s
第三次构建 Done in 6.07s

### 加 cache 配置
第一次构建 Done in 12.85s
第二次构建 Done in 3.76s
第三次构建 Done in 3.73s

### 加 cache 然后修改 App.js
显示 Done in 5.00s
#### 产物对比
之前
  File                                 Size               Gzipped

  dist/js/chunk-vendors.94cf721d.js    116.68 KiB         41.75 KiB
  dist/js/app.fcac79d4.js              16.98 KiB          9.81 KiB
  dist/js/about.3d33d3b7.js            0.42 KiB           0.30 KiB
  dist/css/app.179ac9e3.css            0.42 KiB           0.26 KiB
之后
  File                                 Size               Gzipped

  dist/js/chunk-vendors.94cf721d.js    116.68 KiB         41.75 KiB
  dist/js/app.7b6dd893.js              17.43 KiB          9.82 KiB
  dist/js/about.3d33d3b7.js            0.42 KiB           0.30 KiB
  dist/css/app.179ac9e3.css            0.42 KiB           0.26 KiB

发现只有 dist/js/app.7b6dd893.js 改变了