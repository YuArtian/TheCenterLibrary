import { initState } from "./state";

export function initMixin(Vue) {
  /* Vue 初始化 */
  Vue.prototype._init = function (options) {
    // 获取当前vm实例
    const vm = this;
    // 保存一份用户传入的 options
    vm.$options = options;
    // 初始化状态
    initState(vm);
  };
  /* 挂载方法 */
  Vue.prototype.$mount = function (el) {};
}
