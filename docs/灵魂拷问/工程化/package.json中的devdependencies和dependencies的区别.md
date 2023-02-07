# package.json中的devdependencies和dependencies的区别
> https://docs.npmjs.com/cli/v6/configuring-npm/package-json#devdependencies
> https://blog.csdn.net/sinat_36319434/article/details/110493495
> https://www.yuque.com/alipay2088002421051737/gzaw4a/tvzzs7?

## TLDR;
- 如果作为 npm 包发布，然后 npm install xxx 的形式下载
  这种情况只会下载 dependencies 的依赖，其余依赖将会无视处理
- 如果不是发布npm包，devdependencies和dependencies没有区别，你的依赖放其中哪个都行。当然，为了规范，还是不要乱写