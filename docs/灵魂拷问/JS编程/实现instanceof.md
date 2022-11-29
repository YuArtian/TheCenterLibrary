# 实现instanceof

```js
function new_instance_of(leftVaule, rightVaule) {
  let rightProto = rightVaule.prototype;
  leftVaule = Object.getPrototypeOf(leftVaule);
  while (true) {
    if (leftVaule === null) {
          return false;
      }
      if (leftVaule === rightProto) {
          return true;
      }
      leftVaule = Object.getPrototypeOf(leftVaule);
  }
}

function Super (){}
let s = new Super()

console.log('new_instance_of', new_instance_of({}, Object))
console.log('new_instance_of', new_instance_of(s, Super))
```

