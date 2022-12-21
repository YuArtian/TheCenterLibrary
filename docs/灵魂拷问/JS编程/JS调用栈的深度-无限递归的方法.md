# JS调用栈的深度&无限递归的方法



## 测试调用栈的深度

```js
let index = 0
function a(){
  index += 1
  console.log(index)
  return a()
}
a()
// 结果
// 12548
// Uncaught RangeError: Maximum call stack size exceeded
```

## 无限执行

利用 宏任务 和 微任务的执行机制来避免爆栈

```js
let index = 0
async function a(){
  await undefined
  // (async () => {})
  // await Promise.resolve(setTimeout)
  index += 1
  console.log(index)
  return await a()
}
```

