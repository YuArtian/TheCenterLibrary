# co库的实现

```js
const fs = require('fs').promises;
function * read(){
  let name = yield fs.readFile('name.txt', 'utf-8')
  let age = yield fs.readFile(name, 'utf-8')
  return age
}

const co = it => new Promise((resolve, reject) => {
  function next(data){
    let { value, done } = it.next(data)
    if (!done) {
      return Promise.resolve(value).then(next, reject)
    } else {
      resolve(value)
    }
  }
  next()
})

co(read()).then(data => {
  console.log('data',data)
}).catch(err => {
  console.log('err',err)
})
```

