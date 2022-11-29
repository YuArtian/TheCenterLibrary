# 写一个给函数计数的方法，执行n次后输出结果

```js
function after(times, callback){
  return function(){
    if(--times === 0) {
      callback()
    }
  }
}

const cb = after(3, () => {
  console.log('cb结束')
})

cb()
cb()
cb()
```

