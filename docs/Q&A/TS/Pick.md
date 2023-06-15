# Pick

## TL;DR
Pick(挑选)：`type NewType = Pick<Type, "key1"|"key2">`
从类型中选一个或几个

## eg
```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```