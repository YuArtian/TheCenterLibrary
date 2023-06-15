# MVVM

MVVM是 Model-View-ViewModel （模型-视图-视图模型）的简写，是一个软件架构设计模式

MVVM 的出现促进了 GUI 前端开发与后端业务逻辑的分离，极大地提高了前端开发效率

MVVM 的核心是 ViewModel 层，它就像是一个中转站（value converter），负责转换 Model 中的数据对象来让数据变得更容易管理和使用，该层向上与视图层进行双向数据绑定，向下与 Model 层通过接口请求进行数据交互，起呈上启下作用

![mvvm](https://github.com/YuArtian/yuartian.github.io/blob/master/.gitbook/assets/mvvm.png?raw=true)

# 双向绑定

可以实现双向绑定的方法有很多

- KnockoutJS 基于观察者模式

- Ember 基于数据模型
- Angular 基于脏检查
- Vue 基于数据劫持
  数据劫持也有两种方法来实现
  - Object.defineProperty()
  - Proxy

## 基于数据劫持的双向绑定

### 数据劫持的优势

1. 无需显示调用: 
   例如 Vue 运用数据劫持+发布-订阅，劫持数据对象属性的 setter，直接可以通知变化并驱动视图

   而比如 Angular 的脏检测则需要显示调用 `markForCheck` (可以用 zone.js 避免显示调用,不展开)

   react 需要显示调用 `setState`

2. 可精确得知变化数据：
   劫持了数据对象中属性的 setter，当属性值改变，我们可以精确获知变化的内容 `newVal`，因此在这部分不需要额外的 diff 操作，否则只知道数据发生了变化而不知道具体哪些数据变化了，这个时候需要大量 diff 来找出变化值，这是额外性能损耗

### 完整的双向绑定需要以下几个要点：

1. 利用 `Proxy` 或 `Object.defineProperty` 生成的 Observer，针对对象/对象的属性进行"劫持"

   在属性发生变化后通知订阅者

2. 解析器 Compile 解析模板中的 `Directive`(指令)，收集指令所依赖的方法和数据，等待数据变化然后进行渲染

3. Watcher 属于 Observer 和 Compile 桥梁，它将接收到的 Observer 产生的数据变化，并根据 Compile 提供的指令进行视图渲染，使得数据变化促使视图变化

### Object.defineProperty()

> https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf

#### 简单版本

```html
<body>
  <main>
    <p>请输入:</p>
    <input type="text" id="input">
    <p id="p"></p>
  </main>
</body>
<script>  
const obj = {};
  Object.defineProperty(obj, 'text', {
    get: function () {
      console.log('get val');
    },
    set: function (newVal) {
      console.log('set val:' + newVal);
      document.getElementById('input').value = newVal;
      document.getElementById('p').innerHTML = newVal;
    }
  });

  const input = document.getElementById('input');
  input.addEventListener('input', function (e) {
    obj.text = e.target.value;
  })
</script>
```

#### Vue的实现（结合发布-订阅模式）

Vue 完整实现详情，请看 [Vue实现](../框架/Vue/实现一个Vue.md)

```html
<body>
  <main>
    <p>请输入:</p>
    <input type="text" id="input">
    <p id="p"></p>
  </main>
</body>
<script>
  const Vue = (function () {
    let uid = 0;
    // 用于储存订阅者并发布消息
    class Dep {
      constructor() {
        // 设置id,用于区分新Watcher和只改变属性值后新产生的Watcher
        this.id = uid++;
        // 储存订阅者的数组
        this.subs = [];
      }
      // 触发target上的Watcher中的addDep方法,参数为dep的实例本身
      depend() {
        Dep.target.addDep(this);
      }
      // 添加订阅者
      addSub(sub) {
        this.subs.push(sub);
      }
      notify() {
        // 通知所有的订阅者(Watcher)，触发订阅者的相应逻辑处理
        this.subs.forEach(sub => sub.update());
      }
    }
    // 为Dep类设置一个静态属性,默认为null,工作时指向当前的Watcher
    Dep.target = null;
    // 监听者,监听对象属性值的变化
    class Observer {
      constructor(value) {
        this.value = value;
        this.walk(value);
      }
      // 遍历属性值并监听
      walk(value) {
        Object.keys(value).forEach(key => this.convert(key, value[key]));
      }
      // 执行监听的具体方法
      convert(key, val) {
        defineReactive(this.value, key, val);
      }
    }

    function defineReactive(obj, key, val) {
      const dep = new Dep();
      // 给当前属性的值添加监听
      let chlidOb = observe(val);
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
          // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
          // target指向一个Watcher实例，每个Watcher都是一个订阅者
          // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
          if (Dep.target) {
            dep.depend();
          }
          return val;
        },
        set: newVal => {
          if (val === newVal) return;
          val = newVal;
          // 对新值进行监听
          chlidOb = observe(newVal);
          // 通知所有订阅者，数值被改变了
          dep.notify();
        },
      });
    }

    function observe(value) {
      // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
      if (!value || typeof value !== 'object') {
        return;
      }
      return new Observer(value);
    }

    class Watcher {
      constructor(vm, expOrFn, cb) {
        this.depIds = {}; // hash储存订阅者的id,避免重复的订阅者
        this.vm = vm; // 被订阅的数据一定来自于当前Vue实例
        this.cb = cb; // 当数据更新时想要做的事情
        this.expOrFn = expOrFn; // 被订阅的数据
        this.val = this.get(); // 维护更新之前的数据
      }
      // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
      update() {
        this.run();
      }
      addDep(dep) {
        // 如果在depIds的hash中没有当前的id,可以判断是新Watcher,因此可以添加到dep的数组中储存
        // 此判断是避免同id的Watcher被多次储存
        if (!this.depIds.hasOwnProperty(dep.id)) {
          dep.addSub(this);
          this.depIds[dep.id] = dep;
        }
      }
      run() {
        const val = this.get();
        console.log(val);
        if (val !== this.val) {
          this.val = val;
          this.cb.call(this.vm, val);
        }
      }
      get() {
        // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
        Dep.target = this;
        const val = this.vm._data[this.expOrFn];
        // 置空，用于下一个Watcher使用
        Dep.target = null;
        console.log(Dep.target, 2);
        return val;
      }
    }

    class Vue {
      constructor(options = {}) {
        // 简化了$options的处理
        this.$options = options;
        // 简化了对data的处理
        let data = (this._data = this.$options.data);
        // 将所有data最外层属性代理到Vue实例上
        Object.keys(data).forEach(key => this._proxy(key));
        // 监听数据
        observe(data);
      }
      // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者
      $watch(expOrFn, cb) {
        new Watcher(this, expOrFn, cb);
      }
      _proxy(key) {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: true,
          get: () => this._data[key],
          set: val => {
            this._data[key] = val;
          },
        });
      }
    }

    return Vue;
  })();

  let demo = new Vue({
    data: {
      text: '',
    },
  });

  const p = document.getElementById('p');
  const input = document.getElementById('input');

  input.addEventListener('keyup', function (e) {
    demo.text = e.target.value;
  });

  demo.$watch('text', str => p.innerHTML = str);
</script>
```



### Proxy

#### 简单版

```js
const input = document.getElementById('input');
const p = document.getElementById('p');
const obj = {};

const newObj = new Proxy(obj, {
  get: function(target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log(target, key, value, receiver);
    if (key === 'text') {
      input.value = value;
      p.innerHTML = value;
    }
    return Reflect.set(target, key, value, receiver);
  },
});

input.addEventListener('keyup', function(e) {
  newObj.text = e.target.value;
});
```



