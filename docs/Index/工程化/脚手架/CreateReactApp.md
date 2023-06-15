# CreateReactApp

> https://juejin.im/post/5af452fd518825671c0e96e5
>
> https://juejin.im/post/5af98aaf518825426d2d4142

CRA扩展

> https://juejin.im/post/5a5d5b815188257327399962

## 创建过程

create-react-app 构建项目

1. 判断node版本如果小于4就退出，否则执行 `createReactApp.js` 文件

2. `createReactApp.js`先做一些命令行的处理响应处理，然后判断是否有传入 `projectName` 没有就提示并退出

3. 根据传入的 `projectName` 创建目录，并创建`package.json`。

4. 判断是否有特殊要求指定安装某个版本的`react-scripts`，然后用`cross-spawn`去处理跨平台的命令行问题，用`yarn`或`npm`安装`react`, `react-dom`, `react-scripts`

5. 安装完之后跑 `react-scripts/script/init.js` 修改 `package.json` 的依赖版本，运行脚本，并拷贝对应的模板到目录里

6. 处理完这些之后，输出提示给用户

## 执行

用户输入 yarn start，执行 react-scripts start

