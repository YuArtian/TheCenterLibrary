#### pid杀进程

```shell
sudo kill -9 PID
```

#### docker中查看 ip

```shell
hostname -I
```

#### 查看Linux版本信息

```shell
cat /proc/version
```

#### 查看端口占用情况

```shell
lsof -i:端口号
```

#### 查看磁盘空间

> https://www.runoob.com/w3cnote/linux-view-disk-space.html

```shell
df -hl
```

#### 查看当前文件夹磁盘空间

```shell
du -h --max-depth=1 ./
```

#### 打开iOS模拟器

```shell
open -a Simulator
```



#### Redis 启动/停止/重启

```shell
如果是用apt-get或者yum install安装的redis，可以直接通过下面的命令停止/启动/重启redis

/etc/init.d/redis-server stop
/etc/init.d/redis-server start
/etc/init.d/redis-server restart

如果是通过源码安装的redis，则可以通过redis的客户端程序redis-cli的shutdown命令来重启redis

1.redis关闭
redis-cli -h 127.0.0.1 -p 6379 shutdown

2.redis启动
redis-server

如果上述方式都没有成功停止redis，则可以使用终极武器 kill -9
```

#### 查看系统剩余空间

df -hl

```shell
df -hl 查看磁盘剩余空间
df -h 查看每个根路径的分区大小
du -sh [目录名] 返回该目录的大小
du -sm [文件夹] 返回该文件夹总M数
更多功能可以输入一下命令查看：
df --help
du --help
查看linux文件目录的大小和文件夹包含的文件数
统计总数大小
du -sh xmldb/
du -sm * | sort -n //统计当前目录大小 并安大小 排序
du -sk * | sort -n
du -sk * | grep guojf //看一个人的大小
du -m | cut -d "/" -f 2 //看第二个/ 字符前的文字
查看此文件夹有多少文件 /*/*/* 有多少文件
du xmldb/
du xmldb/*/*/* |wc -l
40752
解释：
wc [-lmw]
参数说明：-l :多少行；-m:多少字符；-w:多少字

两个命令df 、du结合比较直观

df    -h                     查看整台服务器的硬盘使用情况

cd    /                       进入根目录

du   -sh    *              查看每个文件夹的大小

这样的组合可以快速定位大文件和分区满了
```

