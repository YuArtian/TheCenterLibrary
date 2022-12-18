import initMixin from "./initMixin";
import { renderMixin } from "./render";

function Vue(options) {
  // 初始化
  this._init(options);
}
// 拓展初始化方法
initMixin(Vue);
// lifecycleMixin(Vue); // 扩展_update方法
renderMixin(Vue); // 扩展_render方法

export default Vue;
