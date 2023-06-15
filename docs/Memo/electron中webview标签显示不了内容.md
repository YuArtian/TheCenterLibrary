# electron 中 webview 标签显示不了内容

需要配置一下 `BrowserWindow`

```js
mainWindow = new BrowserWindow({
  //others ...
  webPreferences: {
    webviewTag: true,
  },
});
```
