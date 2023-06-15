# ElementUI配合按需设置自定义主题

## 推荐使用官方命令行工具

> 最新node环境下，全局安装 `element-theme` 会有问题
>
> # ReferenceError: primordials is not defined - when trying to generate theme variables file #80
>
> https://github.com/ElementUI/element-theme/issues/80



### 安装

```sh
npm i element-themex element-theme-chalk -D
```

### 使用

1. **在项目根目录运行命令**

   ```shell
   node_modules/.bin/et -i
   ```

   之后会自动生成 `element-variables.scss` 文件

2. **根据需要修改 `element-variables.scss` 中的 `scss` 变量**

   ```js
   //例如
   /* Color
   -------------------------- */
   /// color|1|Brand Color|0
   // $--color-primary: #409EFF !default;
   $--color-primary: #21D4CF !default;
   ```

3. **运行命令，重新编译生成 `theme` 文件夹**

   ```shell
   node_modules/.bin/et
   ```

   > 这之后要注意 `package.json` 文件是否有改动，这里可能有 bug

4. **修改 `babel.config.js`**

   ```js
   module.exports = {
     presets: ["@vue/cli-plugin-babel/preset"],
     plugins: [
       [
         "component",
         {
           libraryName: "element-ui",
           //styleLibraryName 设置为 theme 文件夹路径
           styleLibraryName: "~theme"
         }
       ]
     ]
   };
   ```

