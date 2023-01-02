interface Person {
  name: string;
}

const person: Person = {
  name: 'a'
}
const a = 'global a'

// namespace A {
//   const a = 'namespace a'
// }

declare module 'A' {
  const a = 'module a'
}

type B = Awaited<Promise<Promise<number>>>;

