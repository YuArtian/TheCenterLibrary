# 为什么要在Proxy中使用Reflect





为了解决 this 指向的问题



```js
let person = {
  name: 'xx',
  get aliasName(){
    return this.name + 'yy' // 这里的this指向 person
  }
}

const proxy = new Proxy(person, {
  get(target, key, receiver){
    // return target[key]
    // 这样的话，aliasName 中的this，指向的是 person 而不是代理对象 proxy，所以不会触发 proxy 的 get
    // 也就收集不到 this.name，也就无法监听 name 更新，所以要改为 Reflect.get 为了把this指向当前proxy
    return Reflect.get(target, key, receiver)
  },
  set(){
  		
	}
})
```

