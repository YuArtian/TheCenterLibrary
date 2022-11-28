# 分环境为 Git 指定单独的配置

> https://www.boris1993.com/tools/git/specify-different-git-config-for-different-environments.html

在 2.13 这个版本中，Git 引入了一个名为 “按条件引入”(Conditional includes) 的功能
这个功能允许用户通过指定一定的条件，来使 Git 从不同的配置文件中取得配置项

## includeIf
在 ~ 目录下找到 git 的全局配置文件 .gitconfig
增加 includeIf 配置
```
[core]
  excludesfile = ~/.gitignore_global
  editor = vim
[includeIf "gitdir:~/projects/work/"]
  path = ~/.config/git/gitconfig-work
[includeIf "gitdir:~/projects/personal/"]
  path = ~/.config/git/gitconfig-personal

```

## 检查
不要忘记检查配置是否生效
`git config -l`