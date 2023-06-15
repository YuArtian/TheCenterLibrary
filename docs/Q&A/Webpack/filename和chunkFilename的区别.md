# filename和chunkFilename的区别

filename 是一个很常见的配置，就是对应于 `entry` 里面的输入文件，经过webpack 打包后输出文件的文件名

`chunkFilename` 指未被列在 `entry` 中，却又需要被打包出来的 `chunk` 文件的名称

一般来说，这个 `chunk` 文件指的就是要**懒加载**的代码

## 一句话总结

`filename` 指**列在** `entry` 中，打包后输出的文件的名称

`chunkFilename` 指**未列在** `entry` 中，却又需要被打包出来的文件的名称

