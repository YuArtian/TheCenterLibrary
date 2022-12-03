# webpack缓存原理
> https://webpack.docschina.org/configuration/cache/#root
> https://saber2pr.top/#/blog/%E5%89%8D%E7%AB%AF%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7/webpack/webpack%E7%BC%93%E5%AD%98%E5%8E%9F%E7%90%86
> https://mp.weixin.qq.com/s/sPb20xx-I64mifKa2N3YFQ
> https://github.com/webpack/changelog-v5/blob/master/guides/persistent-caching.md#opt-in
> https://segmentfault.com/a/1190000041726881

## TL;DR
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

### type
默认为 'memory', 从内存中获取
type: 'fileSystem' 时开启持久化缓存
默认缓存存放路径为 ./node_modules/.cache/webpack，可以通过 cacheDirectory 修改


### buildDependencies
