# mac下的权限问题

## /usr/local 权限问题

npm install，或者 npm start 的时候，可能需要各种目录的读写权限

如果你不想每次都输入 sudo 命令，就要设置权限

mac 有 Rootless 机制（也叫SIP），从 OS X El Capitan 10.11 系统开始使用，系统默认将会锁定 /system、/sbin、/usr 这三个目录。用户要获取这三个目录的写权限，需要关闭 Rootless

```bash
sudo chown -R $(whoami) /usr/local/
```

如果失败提示 Operation not permitted 或其他权限不足，则需要关闭Rootless

### 关闭 Rootless/SIP

因为 SIP 是系统级的权限操作，我们无法直接关闭它，需要前往「[macOS 恢复功能](https://support.apple.com/zh-cn/HT201314)」下进行

将 Mac 开机，立即在键盘上按住 Command ⌘ + R，直到看到 Apple 标志或旋转的地球时松开

看到「实用工具」窗口时，恢复功能启动即完成

![img](https://cdn.sspai.com/editor/u_753016/_image/2019-06-03/macOS%20%E6%81%A2%E5%A4%8D%E5%8A%9F%E8%83%BD%E4%B8%8B%20%E6%93%8D%E4%BD%9C%201.png?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1)

在上方的菜单栏点击「实用工具」选择「终端」

![img](https://cdn.sspai.com/editor/u_753016/_image/2019-06-03/macOS%20%E6%81%A2%E5%A4%8D%E5%8A%9F%E8%83%BD%E4%B8%8B%20%E6%93%8D%E4%BD%9C%202.png?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1)

在终端中，输入「csrutil disable」后回车



![回车后会提示「成功关闭了系统完整性保护，请重启机器」](https://cdn.sspai.com/editor/u_753016/_image/2019-06-03/macOS%20%E6%81%A2%E5%A4%8D%E5%8A%9F%E8%83%BD%E4%B8%8B%20%E6%93%8D%E4%BD%9C%203.png?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1)回车后会提示「成功关闭了系统完整性保护，请重启机器」



点击菜单栏  标志，选择「重新启动」

![img](https://cdn.sspai.com/editor/u_753016/_image/2019-06-03/macOS%20%E6%81%A2%E5%A4%8D%E5%8A%9F%E8%83%BD%E4%B8%8B%20%E6%93%8D%E4%BD%9C%204.png?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1)

就此关闭了 SIP

### 设置权限

重启之后，打开终端，输入

```bash
sudo chown -R $(whoami) /usr/local
```

进行权限更改

