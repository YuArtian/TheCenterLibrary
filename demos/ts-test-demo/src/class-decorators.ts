
// 类装饰器
function DecoratorA(...args: any) {
  console.log('ctor', args)
}

@DecoratorA
class A {
  name: string
  constructor() {
    this.name = 'A'
  }
}




//
/* function DecoratorA(...args: any) {
  console.log('args', args)
}

@DecoratorA
  function A() {
  console.log('AAAA')
} */
