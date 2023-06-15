# npm

## 加速与环境设置

### 终端代理

可以设置终端代理，加速下载

```bash
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7891
```

#### --no-proxy

可以设置这次不使用代理

```bash
npm install -g nrm --no-proxy
```

### nrm

```bash
npm install -g nrm
nrm ls
nrm use cnpm
```

