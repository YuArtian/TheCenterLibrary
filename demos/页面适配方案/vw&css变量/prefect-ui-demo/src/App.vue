<template>
  <div class="main">
    <p class="content">
      我是一段文本
      我是一段文本
      我是一段文本
      我是一段文本
    </p>
  </div>
</template>

<script setup lang="ts">
</script>
<style>
:root {
  --ideal-viewport-width: 1600; /* ① */
  --current-viewport-width: 100vw; /* ② */
}
</style>
<style scoped lang="scss">
/** * ①：设计师提供设计稿时，容器宽度（理解成页面宽度）是 1600px * ②：用户当前设备视窗宽度 **/

.content {
  /** * ①：UI 设计希望在 1600px 视窗宽度下卡片标题最理想的字体大小是 16px * ②：计算实际的字体大小。计算公式 理想字体大小 x (当前视窗宽度 / 理想视窗宽度) */
  --ideal-font-size: 16; /* ① */
  font-size: calc(var(--ideal-font-size) * (var(--current-viewport-width) / var(--ideal-viewport-width)))
}
</style>
