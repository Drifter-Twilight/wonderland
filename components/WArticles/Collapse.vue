<template>
  <a-trigger trigger="click" position="bottom" show-arrow class="max-w-xl shadow-dark-400">
    <icon-tags class="absolute top-1/2 -right-5 -translate-y-1/2" />

    <template #content>
      <div class="box-border p-4 bg-[var(--color-bg-popup)] rounded-md shadow-dark-500">
        <w-articles-classify-tag 
          v-for="item in 10" :key="item"
          content="JavaScript" />
      </div>
    </template>
  </a-trigger>
</template>

<script setup lang="ts">
defineProps<{
  tagArr?: string
}>()
</script>

<style scoped>
</style>