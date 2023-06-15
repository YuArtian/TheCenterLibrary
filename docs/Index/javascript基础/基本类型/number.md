# Number

# parseInt

```js
parseInt(string, radix)
```

- `string`

  要被解析的值。如果参数不是一个字符串，则将其转换为字符串(使用  `ToString `抽象操作)。字符串开头的空白符将会被忽略。

- `radix` 可选

  从 `2` 到 `36`，代表该进位系统的数字。例如说指定 `10` 就等于指定十进位

当 radix  小于 `2` 或大于 `36` ，或 第一个非空格字符不能转换为数字时，返回 NaN

parseInt 函数将其第一个参数转换为一个字符串，对该字符串进行解析，然后返回一个整数或 NaN

# parseFloat

```js
parseFloat(string)
```

过程：

- 如果 `parseFloat` 在解析过程中遇到了正号（`+`）、负号（`-` U+002D HYPHEN-MINUS）、数字（`0`-`9`）、小数点（`.`）、或者科学记数法中的指数（e 或 E）以外的字符，则它会忽略该字符以及之后的所有字符，返回当前已经解析到的浮点数
- 第二个小数点的出现也会使解析停止（在这之前的字符都会被解析）
- 参数首位和末位的空白符会被忽略
- 如果参数字符串的第一个字符不能被解析成为数字,`则` `parseFloat` 返回 `NaN`
- `parseFloat` 也可以解析并返回 `Infinity`
- `parseFloat`解析 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 为 [`Numbers`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number), 丢失精度。因为末位 `n` 字符被丢弃