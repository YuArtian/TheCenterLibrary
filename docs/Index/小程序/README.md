# 小程序

## 字节小程序

> 很多功能在模拟器中并不能用，会报错（包括路由跳转等）。所以，最好还是真机扫码调试

### 模块化

可以将一些公共的代码抽离成为一个单独的 js 文件，作为一个模块。模块只有通过 `module.exports` 或者 `exports` 才能对外暴露接口。

**需要注意的是：**

- `exports` 是 `module.exports` 的一个引用，因此在模块里边随意更改 `exports` 的指向会造成未知的错误

  所以更推荐开发者采用 `module.exports` 来暴露模块接口，除非你已经清晰知道这两者的关系

- 小程序目前不支持直接引入 `node_modules` , 开发者需要使用到 `node_modules` 时候建议拷贝出相关的代码到小程序的目录中

### 绑定事件

bind + 事件类型

```html
<button bindtap="defaultTap"> Button </button>
```

### tabBar

在 app.json 中可以配置 tabBar 设置底部的导航栏。支持的属性很少，而且没有设置位置的选项，文档中说有 position 但是没用

### 路由

#### tt.navigateTo

不能跳转 tabBar 中定义过的页面

#### tt.switchTab

专门用来跳转 tab 页面的

### 自定义组件

> 模拟器也不支持调试，需要真机扫码

#### 创建自定义组件

和正常组件一样有 .json、js、ttml、ttss 文件

要在 .json 中配置

```json
{
  "component": true
}
```

要在 .js 中使用 Component 构造函数

```js
Component({
  //属性
  properties: {
    //可以定义 type, value, observer
    headerText: {}，
    //也可以简写，会有对应类型的默认值
    other: String
  },
  // 私有数据，可用于模版渲染
  data: {},
})
```

#### 使用自定义组件

先要在页面的 .json 文件中配置，路径写相对路径也可以

组件名字只能是小写字母、中划线和下划线的组合

```json
{
  "usingComponents": {
    "my-component": "path/to/a/custom/component"
  }
}
```

属性名字可以把 驼峰 变成 - 的，直接用驼峰写法也没有问题

```html
<view class="component-wrapper">
  <my-component header-text="My Title"></my-component>
</view>
```

自定义组件会先和数据结合，然后再被插入到引入页面的节点中

