import { observe } from "./observer/index";

/* 状态初始化 */
export function initState(vm) {
  // 取出 用户配置 中的 data
  let data = vm.$options.data;
  if (!data) return;
  // data 要兼容 function 和 Object 两种方式
  // Q1: Vue中的data为什么要写成 function ?
  data = typeof data === "function" ? data.call(vm) : data;
  // 将 data 同步到 vm 上
  vm._data = data;
  // 将 vm._data 代理到 vm 上，方便直接调用
  // Q1:为什么 Vue 中可以直接使用 this.xxx 来获取 data 上的属性
  for (let key in data) {
    proxy(vm, "_data", key);
  }
  // 对 data 进行响应式处理
  observe(data);
}

/* 设置属性代理 */
function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get: function () {
      return vm[source][key];
    },
    set: function (newValue) {
      vm[source][key] = newValue;
    },
  });
}
