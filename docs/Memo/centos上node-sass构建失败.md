# centos上node-sass构建失败

最终的报错如下：

> npm ERR! code ELIFECYCLE
> npm ERR! errno 1
> npm ERR! node-sass@4.14.1 postinstall: `node scripts/build.js`
> npm ERR! Exit status 1
> npm ERR! 
> npm ERR! Failed at the node-sass@4.14.1 postinstall script.
> npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

但是要仔细看之前的日志

有一行 gyp的报错 如下：

>gyp info spawn make
>gyp info spawn args [ 'V=1', 'BUILDTYPE=Release', '-C', 'build' ]
>make: g++: Command not found
>make: *** [Release/obj.target/libsass/src/libsass/src/ast.o] Error 127

所以，需要安装 g++

```
yum install -y make gcc-c++
```

安装之后，node-sass 的构建就可以成功了

