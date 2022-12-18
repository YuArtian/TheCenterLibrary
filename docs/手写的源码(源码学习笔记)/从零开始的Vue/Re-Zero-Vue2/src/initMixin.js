import compileToFunctions from "./compiler";
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
    // 如果提供了 el 属性，则自动挂载到 el 上
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
  /* 挂载方法 */
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    // 如果没有提供 render 方法
    if (!options.render) {
      let template = options.template;
      // 如果没有模板但是有el
      if (!template && el) {
        // outerHTML 获取描述元素（包括其后代）的序列化 HTML 片段
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/outerHTML
        template = el.outerHTML;
      }
      // 以 template 为模板 生成 render 函数
      const render = compileToFunctions(template);
      options.render = render;
    }
  };
}
