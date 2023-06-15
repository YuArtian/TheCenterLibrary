# 中断一个 Promise

```js
//中断
let promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('ok')
  },3000)
})

const wrap = promise => {
  let abort
  let _p = new Promise((resolve, reject) => {
    abort = reject
  })
  let _race = Promise.race([promise, _p])
  _race.abort = abort
  return _race
}

let p = wrap(promise)

p.then(res => {
  console.log('成功', res)
},err => {
  console.log('err',err)
})

setTimeout(() => {
  p.abort('中断')
}, 1000)
```

