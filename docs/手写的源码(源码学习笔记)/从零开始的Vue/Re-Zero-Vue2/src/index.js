import initMixin from "./initMixin";

function Vue(options) {
  // 初始化
  this._init(options);
}
// 拓展初始化方法
initMixin(Vue);

export default Vue;
