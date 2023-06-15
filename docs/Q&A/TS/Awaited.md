# Awaited
> https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype

递归展开 Promises, 得到其返回的类型

```ts
type A = Awaited<Promise<string>>;
type A = string

type B = Awaited<Promise<Promise<number>>>;
type B = number
```

