# String

## String.raw\(\)

该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串

通常用于模板字符串的处理

## String 查找

* indexOf\(\)：返回索引，找不到返回 -1
* **includes\(\)**：返回布尔值，表示是否找到了参数字符串
* **startsWith\(\)**：返回布尔值，表示参数字符串是否在原字符串的头部
* **endsWith\(\)**：返回布尔值，表示参数字符串是否在原字符串的尾部

### 实现 indexOf 方法

#### 简单版

1. 正则

   ```javascript
   function indexOf(str, value) {
   	let reg = new RegExp(`${value}`, 'gi');
   	let result = reg(str);
   	return result ? result.index : -1
   }
   ```

   

2. 循环

   ```javascript
   function indexOf(str, value){
   	let strL = str.length
   	let valueL = value.length
   	
   	for(let i=0; i <= strL-valueL; i++){
   		if(str.slice(i, i + valueL) == value){
   			return i
   		}
   	}
     return -1
   }
   ```

   



## String.prototype.repeat\(\)

`repeat`方法返回一个新字符串，表示将原字符串重复`n`次

## String.prototype.padStart\(\)/padEnd\(\)

如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()`用于头部补全，`padEnd()`用于尾部补全

```text
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

### 为数值补全指定位数

生成 10 位的数值字符串：

```text
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```

### 提示字符串格式

```text
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

## String.prototype.matchAll\(\)

返回一个正则表达式在当前字符串的所有匹配

## String.prototype.trim\(\)/trimStrart\(\)/trimEnd\(\)



