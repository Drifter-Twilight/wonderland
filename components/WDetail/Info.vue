<template>
  <h1 class="font-bold text-[#D69340]">{{ title }}</h1>

  <div class="flex justify-between items-center mb-3">
    <span class="text-sm text-gray-500"><icon-calendar class="text-lg" /> {{ date }}</span>

    <span>{{ update && update.length > 0 ? update?.length : 0 }}次更新 <icon-refresh /></span>
  </div>

  <div class="flex space-x-4 mb-3">
    <a-tag v-for="item in tags" :key="item" color="#D69340"># {{ item }}</a-tag>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  date?: string
  update?: string[]
  tags?: string[]
}>()
</script>

<style scoped>

</style>