// 接口

interface FooType {
  a: string;
}

function foo(arg: FooType): { foo_a: string } {
  return { foo_a: arg.a }
}

foo({ a: 'string' })

// 只读
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5
// p1.x = 5; // error!
