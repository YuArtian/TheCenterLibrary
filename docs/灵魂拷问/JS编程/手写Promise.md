# 实现一个Promise

> https://github.com/YvetteLau/Blog/issues/2
>
> https://mp.weixin.qq.com/s/5ukdpEc7yYuc5Ngo7AbrFQ



```js
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const isPromise = fn => typeof fn.then === 'function' ? true : false

function resolvePromise(_promise, result, resolve, reject) {
  if (_promise === result) {
    return reject(new TypeError('promise 循环引用'))
  }
  let called
  if ((typeof result === 'object' && typeof result !== null) || typeof result === 'function') {
    let then = result.then
    if (typeof then === 'function') {
      try {
        then.call(result, value => {
          if(called) return
          called = true
          resolvePromise(_promise, value, resolve, reject)
        }, reason => {
          if(called) return
          called = true
          reject(reason)
        })
      } catch (error) {
        if(called) return
        called = true
        reject(error)
      }
    } else {
      resolve(result)
    }
  } else {
    resolve(result)
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.onReslovedCallbacks = []
    this.onRejectedCallbacks = []
    this.value = null
    this.reason = null
    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onReslovedCallbacks.forEach(fn => fn())
      }
    }
    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  /* then */
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    let _promise = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let result = onFulfilled(this.value)
            resolvePromise(_promise, result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.value)
            resolvePromise(_promise, result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this.status === PENDING) {
        this.onReslovedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let result = onFulfilled(this.value)
              resolvePromise(_promise, result, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let result = onRejected(this.value)
              resolvePromise(_promise, result, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return _promise
  }
  catch(callback){
    return this.then(null, callback)
  }
  static reslove(data){
    return new Promise((reslove, reject) => {
      reslove(data)
    })
  }
  static reject(reason){
    return new Promise((reslove, reject) => {
      reject(reason)
    })
  }
  static all(promises){
    return new Promise((reslove, reject) => {
      let arr = []
			let idx = 0
      const resloveResult = (index, data) => {
        arr[index] = data
        //不能用数组的长度来比较，因为给数组赋值的时候 arr[1] = 1 ==> [empty, 1]，length 是 2
        //这里用 index 作为计数器
        if (++idx === promises.length) {
          return reslove(arr)
        }
      }

      for (let index = 0; index < promises.length; index++) {
        let result = promises[index]
        if (isPromise(result)) {
          result.then(data => {
            resloveResult(index, data)
          }, reject)
        } else {
          resloveResult(index, result)
        }
      }
    })
  }
  static race(promises){
    return new Promise((resolve, reject) => {
      for (let index = 0; index < promises.length; index++) {
        let result = promises[index]
        if (isPromise(result)) {
          result.then(resolve, reject)
        } else {
          resolve(result)
        }
      }
    })
  }
}

let p = new Promise((reslove, reject) => {
  console.log('my promise')
  reslove(1)
})
console.log('script start')
console.log('p', p)
p.then((value) => {
  console.log('value',value)
  return 2
}).then(value2 => {
  console.log('value2',value2)
})
console.log('script end')
```

