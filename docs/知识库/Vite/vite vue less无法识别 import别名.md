# vite vue less无法识别 @import ~别名

```js
export default defineConfig({
  // ...
  resolve: {
    alias: [
      { find: /^~/, replacement: '' }
    ],
  }
});
```
