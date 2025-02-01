<template>
  <a-row justify="center" align="start" class="scroll-none scroll-smooth box-border h-full pt-[64px]">
    <a-col :xs="24" :sm="24" :lg="6" :xl="5" class="lg:h-full">
      <w-articles-tab-bar />
    </a-col>

    <a-col :xs="24" :sm="24" :lg="18" :xl="19" class="h-full">
      <w-articles-list />
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
useHead({
  title: '博客列表 · Wonderland'
})
</script>

<style scoped></style>