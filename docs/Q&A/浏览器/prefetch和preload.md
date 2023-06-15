# prefetch和preload

## Preload

浏览器会在遇到如下link标签时，立刻开始下载main.js(不阻塞parser)，并放在内存中，但不会执行其中的JS语句
只有当遇到 script 标签加载的也是main.js的时候，浏览器才会直接将预先加载的JS执行掉

```
<link rel="preload" href="/main.js" as="script">
```

## Prefetch

浏览器会在空闲的时候，下载main.js, 并缓存到disk。当有页面使用的时候，直接从disk缓存中读取。其实就是把决定是否和什么时间加载这个资源的决定权交给浏览器

如果prefetch还没下载完之前，浏览器发现script标签也引用了同样的资源，浏览器会再次发起请求，这样会严重影响性能的，加载了两次，，所以不要在当前页面马上就要用的资源上用prefetch，要用preload

```html
<link href="main.js" rel="prefetch">
```

### dns-prefetch

预先解析 dns，通常用在对 CDN 地址的解析上

```html
<link rel="dns-prefetch" href="//cdn.com">
```

