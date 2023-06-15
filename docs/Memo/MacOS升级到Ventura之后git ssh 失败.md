# MacOS升级到Ventura之后git ssh 失败

> https://juejin.cn/post/7161775368393719838
> https://superuser.com/questions/1749364/git-ssh-permission-denied-in-macos-13-ventura
> https://juejin.cn/post/7161775368393719838
> https://www.cnblogs.com/zeo-to-one/p/8367801.html



新版本升级了 ssh
应该使用 ed25519 生成新的 pub key，并配置到 git 上

如果有如下错误
```shell
ssh -T git@github.com
kex_exchange_identification: Connection closed by remote host
Connection closed by 20.205.243.166 port 22
```
可能是 git host 不对，修改 hosts 文件（使用 switch host）
```
140.82.114.4   github.com
```
