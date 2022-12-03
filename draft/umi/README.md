# umi
> https://juejin.cn/post/7101557365907931172#heading-0




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

