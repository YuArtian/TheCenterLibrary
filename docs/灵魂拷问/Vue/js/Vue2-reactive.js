/* 手写Vue2响应式原理 */

function observer(data) {
  if (data == null || typeof data !== "object") {
    return;
  }
  return new Observer(data);
}
//
class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = data[key];
      defineReactive(data, key, value);
    }
  }
}

function defineReactive(data, key, value) {
  observer(value);
  Object.defineProperty(data, key, {
    get: function() {
      //依赖收集
      console.log("===依赖收集===: key", key, value);
      return value;
    },
    set: function(newValue) {
      observer(newValue);
      value = newValue;
      //派发更新
      console.log("===派发更新=== newValue", key, newValue);
    },
  });
}

const test_data = {
  a: "a",
  b: "b",
};
observer(test_data);

// test_data.a;
// test_data.b;

// test_data.a = "a1";
// test_data.a;

let _id = 0;
class Dep {
  constructor() {
    this.id = _id++;
    this.subs = [];
  }
}
