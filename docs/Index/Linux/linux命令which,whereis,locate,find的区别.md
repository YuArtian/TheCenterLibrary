# linux命令which,whereis,locate,find的区别

> https://zhuanlan.zhihu.com/p/35727707

# linux命令which,whereis,locate,find的区别

1. **which**：常用于查找可直接执行的命令。只能查找可执行文件，该命令基本只在$PATH路径中搜索，查找范围最小，查找速度快。默认只返回第一个匹配的文件路径，通过选项 *-a* 可以返回所有匹配结果。
2. **whereis**：不只可以查找命令，其他文件类型都可以（man中说只能查命令、源文件和man文件，实际测试可以查大多数文件）。在$PATH路径基础上增加了一些系统目录的查找，查找范围比which稍大，查找速度快。可以通过 *-b* 选项，限定只搜索二进制文件。
3. **locate**：超快速查找任意文件。它会从linux内置的索引数据库查找文件的路径，索引速度超快。刚刚新建的文件可能需要一定时间才能加入该索引数据库，可以通过执行updatedb命令来强制更新一次索引，这样确保不会遗漏文件。该命令通常会返回大量匹配项，可以使用 *-r* 选项通过正则表达式来精确匹配。
4. **find**：直接搜索整个文件目录，默认直接从根目录开始搜索，建议在以上命令都无法解决问题时才用它，功能最强大但速度超慢。除非你指定一个很小的搜索范围。通过 *-name* 选项指定要查找的文件名，支持通配符。



**下面通过一个实际的例子来测试和体会几个命令的差异：**

先通过which找到ls命令的位置

```bash
tarena@tedu:/$ which ls
/bin/ls
```

把ls复制到主目录，并把名称修改为newls

```text
tarena@tedu:/$ cp /bin/ls ~/newls
tarena@tedu:/$ cd ~
```

尝试用which和whereis命令查找newls，由于主目录不在$PATH中（除非你恰巧之前你恰巧把～加入$PATH了），所以都无法找到

```text
tarena@tedu:~$ whereis newls
newls:
tarena@tedu:~$ which newls
tarena@tedu:~$ 
```

执行以下export命令，把～加入$PATH，然后我们cd到根目录，再次尝试查找newls，发现已经可以找到了

```text
tarena@tedu:~$ export PATH=$PATH:~
tarena@tedu:~$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin:/home/tarena
tarena@tedu:~$ cd /
tarena@tedu:/$ which newls
/home/tarena/newls
tarena@tedu:/$ whereis newls
newls: /home/tarena/newls
```

我们再cd到～，然后取消newls的可执行权限

```text
tarena@tedu:/$ cd ~
tarena@tedu:~$ chmod u-x newls
```

然后我们再次尝试使用which和whereis查找newls，我们发现whereis可以找到，而which找不到newls。因为which只能用来查找可执行文件，whereis没有该限制。

```text
tarena@tedu:~$ cd /
tarena@tedu:/$ whereis newls
newls: /home/tarena/newls
tarena@tedu:/$ which newls
```

这时我们再把newls改名为ls，然后我们尝试用locate命令找出系统中存在的两个ls文件，我们发现会找到大量不是我们要的文件（此处已省略了很多），但这些文件路径中确实包含ls。

```text
tarena@tedu:~$ cd ~
tarena@tedu:~$ mv newls ls
/bin/false
/bin/ls
/bin/lsblk
/bin/lsmod
/bin/ntfsls
/boot/grub/i386-pc/cbls.mod
/boot/grub/i386-pc/command.lst
/boot/grub/i386-pc/crypto.lst
/boot/grub/i386-pc/fs.lst
/boot/grub/i386-pc/ls.mod
/boot/grub/i386-pc/lsacpi.mod
/boot/grub/i386-pc/lsapm.mod
/boot/grub/i386-pc/lsmmap.mod
/boot/grub/i386-pc/lspci.mod
/boot/grub/i386-pc/moddep.lst
/boot/grub/i386-pc/partmap.lst
/boot/grub/i386-pc/parttool.lst
/boot/grub/i386-pc/terminal.lst
/boot/grub/i386-pc/video.lst
...
```

我们尝试用正则表达式缩小匹配范围

```text
tarena@tedu:~$ locate -r '\bls$'
/bin/ls
/usr/bin/gvfs-ls
/usr/lib/klibc/bin/ls
/usr/share/bash-completion/completions/gvfs-ls
```

我们发现只找到了一个ls，另外一个可能因为系统还没有纳入索引数据库，所以没有找到，我们执行updatedb命令，强制更新一下系统索引，然后再执行一遍locate试试，发现现在可以找到了

```text
tarena@tedu:~$ sudo updatedb
/bin/ls
/home/tarena/ls
/usr/bin/gvfs-ls
/usr/lib/klibc/bin/ls
/usr/share/bash-completion/completions/gvfs-ls
```

find命令全盘查找太慢，所以限制下查找路径，也是同样可以找到

```text
tarena@tedu:~$ find ~ /bin/ -name ls
/home/tarena/ls
/bin/ls
```