"use strict";
// 接口
function foo(arg) {
    return { foo_a: arg.a };
}
foo({ a: 'string' });
let p1 = { x: 10, y: 20 };
p1.x = 5;
// p1.x = 5; // error!
