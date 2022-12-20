/* 响应式 */
export function observe(data) {
  // 基础类型不做响应式
  if (typeof data !== "object" || data == null) return;
  return new Observe(data);
}

class Observe {
  constructor(data) {
    // 对数组进行特殊处理 后续再展开
    if (Array.isArray(data)) {
      //...
    }
    // 递归遍历 data
    this.walk(data);
  }
  walk(data) {
    Object.keys(data).forEach((key) => {
      const item = data[key];
      defineReactive(data, key, item);
    });
  }
}

function defineReactive(data, key, value) {
  // value 也有可能是对象，也要响应式处理
  observe(value);
  Object.defineProperty(data, key, {
    // get 取值函数
    get: function () {
      // 收集依赖
      return value;
    },
    // set 触发更新
    set: function (newValue) {
      if (value === newValue) return;
      // 新值也有可能是对象
      observe(newValue);
      value = newValue;
    },
  });
}
