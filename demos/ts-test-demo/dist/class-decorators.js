"use strict";
/*
// 类装饰器
function DecoratorA(ctor: Function) {
  console.log('ctor', ctor)
}

@DecoratorA
class A {
  name: string
  constructor() {
    this.name = 'A'
  }
}



//
 */
//
function DecoratorA(...args) {
    console.log('args', args);
}
function A() {
    console.log('AAAA');
}
