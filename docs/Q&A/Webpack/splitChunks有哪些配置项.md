# splitChunks有哪些配置项

```js
splitChunks: {
  chunks: 'async', // all async initial 是否对异步代码进行的代码分割
  minSize: 30000,  // 引入模块大于30kb才进行代码分割
  maxSize: 0, // 引入模块大于Xkb时，尝试对引入模块二次拆分引入
  minChunks: 1, // 引入模块至被使用X次后才进行代码分割
  maxAsyncRequests: 5, // 
  maxInitialRequests: 3,
  automaticNameDelimiter: '~',
  name: true,
  cacheGroups: {
    vendors: {
      test: /[\\/]node_modules[\\/]/,
      priority: -10, // 优先级 
      filename: 'vendors.js' // 打包文件名称
    },
    default: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true // 是否复用已打包代码
    }
  }
}
```

