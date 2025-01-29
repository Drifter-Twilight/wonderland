<template>
  <h1 class="font-bold text-[var(--color-primary)]">{{ title }}</h1>

  <div class="flex justify-between items-center mb-3">
    <span class="text-sm text-gray-500"><icon-calendar class="text-lg" /> {{ date }}</span>

    <span>{{ update }}次更新 <icon-refresh /></span>
  </div>

  <div class="flex space-x-4 mb-3">
    <a-tag v-for="item in tags" :key="item" color="var(--color-primary)"># {{ item }}</a-tag>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  date?: string
  update?: number
  tags?: string[]
}>()

useHead({
  title: `${props.title} · Wonderland`
}) 
</script>

<style scoped>

</style>