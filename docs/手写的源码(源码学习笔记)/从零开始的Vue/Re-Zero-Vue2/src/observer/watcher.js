let id = 0;
// new Watcher(vm, updateComponent, () => {}, true); // updateComponent();
class Watcher {
  // exprOrFn -> updateComponent
  // 初始化 Watcher 时，调用 getter 函数，也就是 updateComponent
  // render函数生成虚拟dom时，会触发之前响应式为属性设置的 getter取值函数，将当前 watcher 加入 Dep，记录下来
  // 之后 update 方法将虚拟dom，转换为真实 dom，更新页面
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    if (typeof exprOrFn == "function") {
      this.getter = exprOrFn;
    }
    this.cb = cb;
    this.options = options;
    this.id = id++;
    this.get();
  }
  get() {
    this.getter();
  }
}

export default Watcher;
