# 微前端

> http://blog.itpub.net/31559758/viewspace-2695430/
>
> https://tech.meituan.com/2019/12/26/meituan-bifrost.html
>
> qiankun
>
> https://juejin.cn/post/6856569463950639117#heading-0
>
> https://juejin.cn/post/6844904185910018062#heading-0
>
> https://www.yuque.com/kuitos/gky7yw/uyp6wi#ZytnB
>
> https://www.infoq.cn/article/yuWiaiui6C18Od5uZiuF
>
> 

## 隔离方案

### CSS隔离

#### 子应用之间样式隔离

- 动态样式表
  子应用切换时，将老样式表文件移除，加入新子应用的样式表

#### 父子应用样式隔离

- 名称约定
  约束力不强，需要人为维护

- CSS Modules
  子应用打包时加入独特的选择器名称
  使用 `postcss` 和  `postcss-selector-namespace` 插件

  ```js
  module.exports = {
    plugins: {
      // postcss-selector-namespace: 给所有css添加统一前缀，然后父项目添加命名空间
      "postcss-selector-namespace": {
        namespace() {
          return ".app-css-namespace";
        }
      }
    }
  };
  ```

- Shadow DOM

  利用 shadow Dom 可以实现真正意义上的隔离
  但不试用于一些特殊情况，比如挂到 body 上的弹窗等脱离 shadow dom 控制范围的情况

## JS隔离

### 快照沙箱

对子应用 window 进行快照，切换应用时进行丢弃和恢复

适用于单实例模式，多个子应用同时存在时就不行了

核心代码：

```js
function iter(obj, callbackFn) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      callbackFn(prop);
    }
  }
}
class SnapshotSandbox {
  constructor(){
    this.proxy = window
    // 记录在 window 上的修改
    this.modifyPropsMap = {}
    this.active()
  }
  // 激活
  active(){
    this.windowSnapshot = {}
    iter(window, prop => {
      this.windowSnapshot[prop] = window[prop];
    })
    // 恢复之前的变更
    Object.keys(this.modifyPropsMap).forEach((p) => {
      window[p] = this.modifyPropsMap[p];
    });
  }
  // 丢弃
  inactive(){
    iter(window, prop => {
      if (window[prop] !== this.windowSnapshot[prop]) {
        this.modifyPropsMap[prop] = window[prop]
        window[prop] = this.windowSnapshot[prop]
      }
    })
  }
}
```

### 代理沙箱

使用 ES6 的 proxy 实现，支持多个实例



