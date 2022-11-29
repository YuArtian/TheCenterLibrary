# Omit
> https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys

## TL;DR
Omit（忽略）: `type NewType = Omit<Type, "key1"|"key2">;`
继承一个类型，忽略掉指定的属性。忽略多个用 `|` 连接

## eg
### 忽略一个
```
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};
```
### 忽略多个
```
type TodoInfo = Omit<Todo, "completed" | "createdAt">;

const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};

```
