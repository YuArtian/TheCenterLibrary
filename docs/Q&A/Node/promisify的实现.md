# promisify的实现

```js
const promisify = fn => (...args) => new Promise((resolve, reject) => {
  fn(...args, function(err, data){
    if(err) reject(err)
    resolve(data)
  })
})
```

