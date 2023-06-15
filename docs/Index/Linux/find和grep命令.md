# find和grep命令

> https://www.cnblogs.com/wanqieddy/archive/2011/06/09/2076785.html
>
> https://blog.csdn.net/hellocooper/article/details/50914529
>
> https://www.runoob.com/linux/linux-comm-grep.html

### linux常用命令－find和grep区别及使用方法

## find和grep区别

```
find是搜索文件名，查找匹配条件的文件，输出匹配文件

grep是搜索文件内容，查找匹配条件的文件行，输出匹配行或含有匹配内容的文件
```

详细解释
find
功能：在目录结构中搜索文件，并执行指定的操作。此命令提供了相当多的查找条件，功能很强大。
语法: find 查找位置 匹配文件名
说明：find命令从指定的起始目录开始，递归地搜索其各个子目录，查找满足寻找条件的文件并对之采取相关的操作。

grep
grep全称是Global Regular Expression Print。
一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来。
语法：grep 匹配字符串 文件名

示例
find
用法：
find path -option [ -print ] [ -exec -ok command ] {} \;

示例：
$find . -name “*.txt” #在当前目录中查.txt文件并显示
$find . -size +1000000c #查长度大于1Mb的文件

选项参数
-name filename #查找名为filename的文件
-perm #按执行权限来查找
-user username #按文件属主来查找
-group groupname #按组来查找
-mtime -n +n #按文件更改时间来查找文件，-n指n天以内，+n指n天以前
-atime -n +n #按文件访问时间来查GIN: 0px”>
-ctime -n +n #按文件创建时间来查找文件，-n指n天以内，+n指n天以前
-size n[c] #查长度为n块[或n字节]的文件
……
……

参考文章：http://www.cnblogs.com/wanqieddy/archive/2011/06/09/2076785.html

grep
下面是一些有意思的命令行参数：

grep -r pattern files ：搜索子目录
grep -n pattern files : 显示匹配行及行号
grep -i pattern files ：不区分大小写地搜索。默认情况区分大小写，
grep -l pattern files ：只列出匹配的文件名，
grep -L pattern files ：列出不匹配的文件名，
grep -w pattern files ：只匹配整个单词，而不是字符串的一部分（如匹配‘magic’，而不是‘magical’），
grep -C number pattern files ：匹配的上下文分别显示[number]行，
grep pattern1 | pattern2 files ：显示匹配 pattern1 或 pattern2 的行，
grep pattern1 files | grep pattern2 ：显示既匹配 pattern1 又匹配 pattern2 的行。

这里还有些用于搜索的特殊符号：

< 和 > 分别标注单词的开始与结尾。
例如：
grep man * 会匹配 ‘Batman’、‘manic’、‘man’等，
grep ‘

