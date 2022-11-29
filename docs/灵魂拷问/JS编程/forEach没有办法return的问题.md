# forEach没有办法return的问题

可以用 Array.some 和 Array.every 替代

Array.some 返回 true 的话会跳出循环

Array.every 返回 false 的话会跳出循环

可以用 for 循环改写