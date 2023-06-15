# watch的属性用箭头函数定义结果会怎么样

不应该使用箭头函数来定义 watcher 函数

 (例如 searchQuery: newValue => this.updateAutocomplete(newValue))

理由是箭头函数绑定了父级作用域的上下文

所以 this 将不会按照期望指向 Vue 实例，this.updateAutocomplete 将是 undefined

