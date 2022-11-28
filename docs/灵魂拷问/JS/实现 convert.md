# 实现 convert 方法

> [实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/139#)

以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性 children 数组下，结构如下：

```js
// 原始 list 如下
let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];
const result = convert(list);

// 转换后的结果如下
let result = [
    {
      id: 1,
      name: '部门A',
      parentId: 0,
      children: [
        {
          id: 3,
          name: '部门C',
          parentId: 1,
          children: [
            {
              id: 6,
              name: '部门F',
              parentId: 3
            }, {
              id: 16,
              name: '部门L',
              parentId: 3
            }
          ]
        },
        {
          id: 4,
          name: '部门D',
          parentId: 1,
          children: [
            {
              id: 8,
              name: '部门H',
              parentId: 4
            }
          ]
        }
      ]
    },
  ···
];
```





```js
const convert = (items, id = 0, link = 'parentId') => { // code就是老爸的code，大型认爹现场
  return items
    .filter(v => v[link] === id)
    .map(v => ({ ...v, children: convert(items, v.id) }))
}
```



```js
const convert = (items, id = 0, link = 'parentId') => {
  const res = []
  for (let v of items) {
    if (v[link] === code) {
      res.push({
        ...v,
        children: convert(items, v.id)
      })
    }
  }
  return res
}
```



```js
const convertTree2 = (list) => {
  const arr = Array.from(list)
  const res = []

  const map = arr.reduce((pre, cur) => {
    cur.children = []
    pre[cur.id] = cur
    return cur
  }, {})

  arr.forEach(item => {
    if(item.parentId === 0) {
      res.push(item)
      return
    }
    map[item.parentId]['children'].push(item)
  })
  return res
}

const tree = convertTree(list)
```

## 树形转回数组

```js
const convertArr = (tree, parentId=0, res=[]) => {
  tree.forEach(({ children, ...item }) => {
    res.push({ parentId, ...item })
    if(children && children.length !== 0) {
      convertArr(children, item.id, res)
    }
  })
  return res
}
```

