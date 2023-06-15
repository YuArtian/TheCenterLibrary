# elementUI-封装dialog组件

> https://juejin.cn/post/6844904024257331214



before-close 关闭前的回调，会暂停 Dialog 的关闭 function(done)，done 用于关闭 Dialog 所以，只要加个before-close，里面不要调用 done，即可