# umi
> https://juejin.cn/post/7101557365907931172#heading-0
> https://mp.weixin.qq.com/s?__biz=MjM5NDgyODI4MQ%3D%3D&mid=2247484533&idx=1&sn=9b15a67b88ebc95476fce1798eb49146
> https://zhuanlan.zhihu.com/p/385272270
> https://zhuanlan.zhihu.com/p/515714350

# MFSU
> https://umijs.org/blog/mfsu-faster-than-vite
> https://v3.umijs.org/zh-CN/docs/mfsu
> https://socket.dev/npm/package/vue-cli-plugin-mfsu

# father
> https://github.com/umijs/father#readme
> https://github.com/umijs/father/blob/master/docs/guide/index.md
> https://github.com/umijs/father/blob/master/docs/guide/build-mode.md
> https://github.com/umijs/father/blob/master/docs/guide/esm-cjs.md#%E5%A6%82%E4%BD%95%E9%80%89%E6%8B%A9


# 其他提速
> https://juejin.cn/post/7099647308983173156
> https://parceljs.org/languages/css/

# 命令注册

1. pck.json
"build": "umi build",

2. node_moudules/.bin/umi -> node_moudules/umi/bin/umi.js -> node_moudules/umi/dist/cli/cli.js
  运行 run 方法
  源码位置: packages/umi/src/cli/cli.ts

3. packages/umi/src/cli/cli.ts
function run {
  //...
  } else if (command === 'build') {
    process.env.NODE_ENV = 'production';
  }
  //...
  await new Service().run2({
    name: args._[0],
    args,
  });
}

4. 源码位置：packages/umi/src/service/service.ts

// require.resolve('@umijs/preset-umi')
export class Service extends CoreService {
  constructor(){
    super({
      //...
      presets: [require.resolve('@umijs/preset-umi'), ...(opts?.presets || [])],
      //...
    });
  }
}

5. @umijs/preset-umi 加载内置预设插件
6. packages/preset-umi/src/commands/build.ts build命令

