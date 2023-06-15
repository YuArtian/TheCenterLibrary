# TypeScript 引入第三方包，报无法找到模块错误

解决办法有两种

## 方法一

根据报错提示尝试安装该库的 TypeScript 版本 （该库的 ts 声明文件），也就是在该库的名称前加上 @types/
本例子为 npm install @types/react-router-dom
其它库如下：

```bash
npm install @types/XXX
or
yarn add @types/XXX
```

但是，不是所有的第三方库都有 TypeScript 的版本，所以方法一不能保证百分百有效，如果方法一不奏效，那么我们来看一下方法二

## 方法二

- 在项目根目录新建 typings 文件夹
- 在 tsconfig.json 里的 include 添加上 typings
- 在 typings 文件夹里新建类型声明文件，格式为 XXX.d.ts 本例子为 react-router-dom.d.ts
  ```js
  "include": ["app", "typings"],
  ```
- 声明模块类型
  ```js
  declare module 'react-router-dom' {
    const content: any
    export = content
  }
  ```
