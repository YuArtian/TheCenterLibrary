import { Watcher } from "./observer/watcher";
import { patch } from "./vdom/patch";

export function lifecycleMixin(Vue) {
  // 更新真实节点
  Vue.prototype._update = function (vnode) {
    // patch 方法将虚拟节点转换成真实节点
    vm.$el = patch(vm.$options.el, vnode);
  };
}

export function mountComponent(vm, el) {
  // 默认vue是通过 watcher 来进行渲染
  // 渲染 watcher （每一个组件都有一个渲染watcher）
  let updateComponent = () => {
    vm._update(vm._render()); // 虚拟节点
  };
  new Watcher(vm, updateComponent, () => {}, true); // updateComponent();
}
