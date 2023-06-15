# webpack为什么能识别webpack.config.js

因为默认运行的是项目中 node_modules 下面的 webpack

webpack 默认调用 webpack-cli，cli 中 bin 目录下的 config-yargs.js 会对配置参数进行解析

这个文件中有解析的关系，默认的名字其实有两种 webpack.config.js 或者 webpackfile.js

当然 webpack 也可以更改配置，来支持其他的配置文件名字

