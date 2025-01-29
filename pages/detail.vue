<template>
  <a-row justify="center" align="start" class="detail-container scrollbar scroll-smooth box-border overflow-y-auto overflow-x-hidden h-full pt-[64px] lg:pt-0">
    <nuxt-page />
    
    <a-back-top target-container=".detail-container" :visible-height="500" :style="{ position: 'absolute' }" />
  </a-row>
</template>

<script setup lang="ts">

</script>

<style scoped>
:deep(.arco-back-top-btn) {
  width: 4rem;
  height: 4rem;
  background-color: var(--color-primary);
}
</style>