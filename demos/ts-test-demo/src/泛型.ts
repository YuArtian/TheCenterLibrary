
//
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}

identity<number, string>(1, '2')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Parameters1<T extends (...args: any) => any> = T extends (...args: infer P) =>  any ? P : never
