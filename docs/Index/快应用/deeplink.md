# deeplink

> 原生跳转可以支持 3 种形式
>
> 快应用内部只支持通过hap链接打开快应用，http和https链接将被当成web页面打开

## deeplink 支持的格式

- `http://hapjs.org/app/<package>/[path][?key=value]`
- `https://hapjs.org/app/<package>/[path][?key=value]`
- `hap://app/<package>/[path][?key=value]`

### 参数说明

- package: 应用包名，必选
- path: 应用内页面的 path，可选，默认为首页
- key-value: 希望传给页面的参数，可选，可以有多个

## 原生App打开快应用

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
// 原生App中可以使用hap、http、https三种链接
intent.setData(Uri.parse("hap://app/com.example/Detail?key1=value1&key2=value2"));
context.startActivity(intent);
```

## 快应用打开另外一个快应用

```javascript
import router from '@system.router'

router.push({
  // 快应用内只能使用hap链接
  uri: 'hap://app/com.example.quickapp/page?key=value'
})
```

## 获取key-value

在 .ux 文件中，通过 public 字段，定义和 key 名相同的属性获取外部参数

如果参数 key 未被声明，public 不会新增这个属性，即获取不到参数值

```javascript
export default {
  public: {
    key: null
  },
  onShow() {
    console.log(this.key)
  }
}
```

