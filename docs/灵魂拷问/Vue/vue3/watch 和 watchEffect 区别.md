# watch 和 watchEffect 区别

> https://juejin.cn/post/7109009230132150280#heading-7

## watch
在 Vue3 中的组合式 API 中，watch 的作用和 Vue2 中的 watch 作用是一样的，他们都是用来监听响应式状态发生变化的，当响应式状态发生变化时，都会触发一个回调函数

强调 watch 监听的是响应式数据，如果监听的数据不是响应式的，抛出警告

watch 可以监听的值：
1. ref 和计算属性
2. getter 函数（取响应式对象的值并返回）
3. 响应式对象

```js
watch(message, (newValue, oldValue) => {
  console.log("新的值:", newValue);
  console.log("旧的值:", oldValue);
});
```

watch 不能直接监听响应式对象的属性，即下面的写法是错误的
```js
watch(number.count, (newValue, oldValue) => {
  console.log("新的值:", newValue);
  console.log("旧的值:", oldValue);
});
```

### 清理函数
onCleanup 在下一次执行 watch 回调的时候，执行上一次的 onCleanup 函数
```js
watch(number.count, (newValue, oldValue, onCleanup) => {
  console.log("新的值:", newValue);
  console.log("旧的值:", oldValue);
  onCleanup(function(){
    //...
  })
});
```


## watchEffect
只有当我们监听的数据源发生了变化，监听函数的回调函数才会执行。但是需求总是多变的，有些场景下我们可能需要刚进页面，或者说第一次渲染页面的时候，watch 监听器里面的回调函数就执行一遍

```js
const number = reactive({ count: 0 });
const countAdd = () => {
  number.count++;
};
watchEffect(()=>{
  console.log("新的值:", number.count);
})
```

- watch 和 watchEffect 都能监听响应式数据的变化，不同的是它们监听数据变化的方式不同。
- watch 会明确监听某一个响应数据，而 watchEffect 则是隐式的监听回调函数中响应数据。
- watch 在响应数据初始化时是不会执行回调函数的，watchEffect 在响应数据初始化时就会立即执行回调函数
