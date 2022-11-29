# 实现一个sleep函数

```js
async sleep (time){
  new Promise(r => setTimeout(r, time))
}
```