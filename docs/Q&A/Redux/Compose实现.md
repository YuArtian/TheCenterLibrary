# Compose实现

## 同步

```js
export default function compose(...funcs){
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a,b) => (...args) => a(b(...args)))
}
```

## 异步

```js
app.compose = function() {
  return Promise.resolve(
    app.middlewares.reduce((a, b) => arg =>
                           Promise.resolve(a(() => b(arg)))
                          )(() => Promise.resolve())
  );
};
```

