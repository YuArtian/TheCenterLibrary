const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    cache: {
      type: "filesystem",
      buildDependencies: {
        config: [__filename],
      },
    },
  },
});
