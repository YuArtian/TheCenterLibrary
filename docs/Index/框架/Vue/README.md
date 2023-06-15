# Vue

> https://mp.weixin.qq.com/s/jLcz0vZrc-t2D_9vOOB6FA

# Vue 架构

## Vue三要素

- 响应式: 例如如何监听数据变化,其中的实现方法就是 **双向绑定**
- 模板引擎: 如何解析模板
- 渲染: Vue如何将监听到的数据变化和解析后的HTML进行渲染

## 模块流程

![vue流程](https://github.com/YuArtian/yuartian.github.io/blob/master/.gitbook/assets/vueMVVM.png?raw=true)



Watcher 与 Dep 的对应关系

在一个Vue组件实例中，渲染 Watcher 只有一个

而实例中的每一个响应式变量都会有一个Dep。于是，一个组件中的Watcher与Dep之间的关系，是一对多的关系

而现实应用中，Vue组件不止一个，组件内部还会嵌套组件，而响应式变量有可能会与多个组件产生关联

于是，在这个层面上，Dep会对应多个Watcher

综上，Watcher与Dep之间，是多对多的关系

## 核心概念

### 数据驱动

### 组件化

